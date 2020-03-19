var config = {
    "OAuthLambdaURL": "https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-OAuth",
    "RefreshTokenLambdaURL": "https://h1uocsqi81.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-RefreshToken",
    "QueryLambdaURL": "https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-Query",

    "AtlassianAuthURL": "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=IbpP46v0z5mLlBLgI2CStabBldUwT9P0&scope=read%3Ajira-user%20read%3Ajira-work%20offline_access&redirect_uri=http://localhost:3000/jira&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent",
    "TrelloAuthURL": "https://api.trello.com/1/authorize?callback_method=fragment&return_url=http://localhost:3000/trello&scope=read&expiration=never&name=Test&key=752171e46c0819c7346de816860c9086&response_type=token"
}

module.exports.config = config