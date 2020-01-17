var moment = require('moment')
var config = require('../../config/config').config

function auth() {

    // TODO - handle an expired token (integrate refresh tokens so the user isn't sent off for reauth)
    return new Promise(function (resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('code');

        if (myParam) {
            // Send the code to lambda and swap it for an access token
            var Http = new XMLHttpRequest();
            var url = config.OAuthLambdaURL;
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
            window.location = config.AtlassianAuthURL
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
                var url = config.RefreshTokenLambdaURL;
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
            window.location = config.AtlassianAuthURL
        }

    })
}


module.exports = {
    auth: auth,
    getAccessToken: getAccessToken
}