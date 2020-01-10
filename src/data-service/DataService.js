import AuthService from '../auth-service/AuthService'

function executeJiraQuery(jql) {

    return new Promise(function (resolve, reject) {
        var Http = new XMLHttpRequest();

        var url = 'https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-Query';

        Http.open("POST", url, true);

        /* fields to display:
            1. Assignee
            2. Original Estimate
            3. Time tracking
            4. Description
            5. Comments
            6. Due Date
            7. Priority
            8. Last Updated
            9. Title
            10. Key
            11. Status
        */

        AuthService.getAccessToken().then(function (token) {
            Http.send(JSON.stringify({
                jql: jql,
                access_token: token,
                fields: "project,issuelinks,status,issuetype,subtasks,summary,comment,priority,assignee,description,duedate,updated,worklog,timeoriginalestimate"
            }))

            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    //console.log(Http.responseText);
                    resolve(JSON.parse(Http.responseText))
                }
            }
        })


    })

}


module.exports = {
    executeJiraQuery: executeJiraQuery
}