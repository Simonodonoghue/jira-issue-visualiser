import AuthService from '../auth-service/AuthService'

function executeJiraQuery(jql) {

    return new Promise(function (resolve, reject) {
        var Http = new XMLHttpRequest();
        
        var url = 'https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-Query';

        Http.open("POST", url, true);

        Http.send(JSON.stringify({
            jql: jql,
            access_token: AuthService.getAccessToken(),
            fields: "project,issuelinks,status,issuetype,subtasks"
        }))

        Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
                console.log(Http.responseText);
                resolve(JSON.parse(Http.responseText))
            }
        }

    })

}


module.exports = {
    executeJiraQuery: executeJiraQuery
}