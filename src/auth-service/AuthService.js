var moment = require('moment')

function auth() {

    // TODO - handle an expired token (integrate refresh tokens so the user isn't sent off for reauth)
    return new Promise(function (resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('code');

        if (myParam) {
            // Send the code to lambda and swap it for an access token
            var Http = new XMLHttpRequest();
            var url = 'https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-OAuth';
            Http.open("POST", url, true);
            Http.send(JSON.stringify({
                authCode: myParam,
                redirect_uri: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
            }))

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    var access_token = JSON.parse(JSON.parse(Http.responseText))

                    // add expiry time
                    access_token['expire_after'] = moment().add((access_token.expires_in / 60), 'minutes')

                    localStorage.setItem('jira-access-token', JSON.stringify(access_token))
                    localStorage.setItem('jira-refresh-token', access_token.refresh_token)
                    resolve(true)
                }


            }
        } else if (localStorage.getItem('jira-access-token')) {
            resolve(false)
        } else {
            window.location = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=IbpP46v0z5mLlBLgI2CStabBldUwT9P0&scope=read%3Ajira-user%20read%3Ajira-work%20offline_access&redirect_uri=' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent'
        }
    })

}

function getAccessToken() {
    // Add checks in here to see if token expired, etc.

    return new Promise(function (resolve, reject) {
        if (localStorage.getItem('jira-access-token')) {
            var access_token = JSON.parse(localStorage.getItem('jira-access-token'))

            if (moment().isAfter(moment(access_token.expire_after))) {

                var Http = new XMLHttpRequest();
                var url = 'https://h1uocsqi81.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-RefreshToken';
                Http.open("POST", url, true);
                Http.send(JSON.stringify({
                    refreshToken: localStorage.getItem('jira-refresh-token')
                }))

                Http.onreadystatechange = (e) => {
                    if (Http.readyState == 4 && Http.status == 200) {
                        var new_access_token = JSON.parse(JSON.parse(Http.responseText))

                        // add expiry time
                        new_access_token['expire_after'] = moment().add((new_access_token.expires_in / 60), 'minutes')

                        localStorage.setItem('jira-access-token', JSON.stringify(new_access_token))
                        resolve(new_access_token.access_token)
                    }


                }

            } else {
                resolve(access_token.access_token)
            }
        } else {
            reject()
        }

    })




    return JSON.parse(localStorage.getItem('jira-access-token')).access_token
}


module.exports = {
    auth: auth,
    getAccessToken: getAccessToken
}