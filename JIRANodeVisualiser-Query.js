const https = require('https')

exports.handler = async(event) => {
    return new Promise((resolve, reject) => {

        const options = {
            hostname: 'api.atlassian.com',
            path: '/oauth/token/accessible-resources',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(event.body).access_token
            }
        }

        const jiraReq = https.request(options, (jiraRes) => {
            console.log(`statusCode: ${jiraRes.statusCode}`)

            var body = ''

            jiraRes.on('data', (d) => {
                body += d
            })

            jiraRes.on('end', (d) => {
                var jsonResponse = JSON.parse(body)
                getResults(encodeURIComponent(JSON.parse(event.body).jql), 0, { issues: [], url: jsonResponse[0].url }, resolve, JSON.parse(event.body).access_token, jsonResponse[0].id);
            })

        })

        jiraReq.on('error', (e) => {
            console.log(e)
        })

        jiraReq.end()

    })


};

function getResults(jql, startAt, json, resolve, access_token, cloud_id) {

    return new Promise(function(innerResolve, reject) {
        try {
            const options = {
                hostname: 'api.atlassian.com',
                path: '/ex/jira/' + cloud_id + '/rest/api/2/search?jql=' + jql + '&maxResults=100&startAt=' + startAt + '&fields=project,issuelinks,status,issuetype,subtasks',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            }

            const jiraReq = https.request(options, (jiraRes) => {
                console.log(`statusCode: ${jiraRes.statusCode}`)

                var body = ''

                jiraRes.on('data', (d) => {
                    body += d
                })

                jiraRes.on('end', (d) => {
                    var jsonResponse = JSON.parse(body)
                    innerResolve(jsonResponse)
                })

            })

            jiraReq.on('error', (e) => {
                console.log(escape)
            })

            jiraReq.end()
        }
        catch (e) {
            console.log(e)
        }

    }).then(data => {

        json.issues = json.issues.concat(data.issues)

        if ((data.startAt + data.maxResults) < data.total) {
            getResults(jql, data.startAt + data.maxResults, json, resolve, access_token, cloud_id)
        }
        else {
            const response = {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                statusCode: 200,
                body: JSON.stringify(json),
            };

            resolve(response)
        }

    })
}
