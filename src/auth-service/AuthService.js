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
                authCode: myParam
            }))

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    localStorage.setItem('jira-access-token', JSON.parse(Http.responseText))
                    resolve(true)
                }

                
            }
        } else if (localStorage.getItem('jira-access-token')) {
            resolve(false)
        } else {
            window.location = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=IbpP46v0z5mLlBLgI2CStabBldUwT9P0&scope=read%3Ajira-user%20read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent'
        }
    })

}

function getAccessToken() {
    // Add checks in here to see if token expired, etc.
    return JSON.parse(localStorage.getItem('jira-access-token')).access_token
}

module.exports = {
    auth: auth,
    getAccessToken: getAccessToken
}