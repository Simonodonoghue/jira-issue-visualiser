var config = {
    "OAuthLambdaURL": "https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-OAuth",
    "RefreshTokenLambdaURL": "https://h1uocsqi81.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-RefreshToken",
    "QueryLambdaURL": "https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-Query",

    "AtlassianAuthURL": "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=IbpP46v0z5mLlBLgI2CStabBldUwT9P0&scope=read%3Ajira-user%20read%3Ajira-work%20offline_access&redirect_uri=http://localhost:3000/jira&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent"
}

module.exports.config = config