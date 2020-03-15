import AuthService from '../auth-service/AuthService'
var config = require('../../config/config').config

function executeJiraQuery(jql) {

    return new Promise(function (resolve, reject) {
        var Http = new XMLHttpRequest();

        var url = config.QueryLambdaURL;

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

        AuthService.getJiraAccessToken().then(function (token) {
            Http.send(JSON.stringify({
                jql: jql,
                type: 'issue',
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

function executeGetProjects() {
    return new Promise(function (resolve, reject) {
        var Http = new XMLHttpRequest();

        var url = config.QueryLambdaURL;

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

        AuthService.getJiraAccessToken().then(function (token) {
            Http.send(JSON.stringify({
                type: 'project',
                access_token: token,
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

function getCards(boardId) {
    return new Promise(function (resolve, reject) {
        var Http = new XMLHttpRequest();

        var url = "https://api.trello.com/1/boards/591b615d0039a98cfa259b15/cards?key=752171e46c0819c7346de816860c9086&token=" + localStorage.getItem("trello-token");

        Http.open("GET", url, true);

        Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
                //console.log(Http.responseText);
                resolve(JSON.parse(Http.responseText))
            }
        }

        Http.send();

    })

}

module.exports = {
    executeJiraQuery: executeJiraQuery,
    executeGetProjects: executeGetProjects,
    getCards: getCards
}