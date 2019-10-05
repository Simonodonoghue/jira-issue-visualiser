exports.handler = async(event) => {

    return new Promise(function(resolve, reject) {
        const https = require('https')

        const options = {
            hostname: 'auth.atlassian.com',
            path: '/oauth/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)

            var data = ""

            res.on('data', (d) => {
                data += d
            })

            res.on('end', (d) => {
                const response = {
                    headers: {
                      "Access-Control-Allow-Origin": "*"
                    },
                    statusCode: 200,
                    body: JSON.stringify(data),
                };
                resolve(response)
            })
        })

        req.on('error', (error) => {
            console.error(error)
        })

        req.write(JSON.stringify({
            "grant_type": "authorization_code",
            "client_id": process.env.CLIENT_ID,
            "client_secret": process.env.CLIENT_SECRET,
            "code": JSON.parse(event.body).authCode,
            "redirect_uri": "https://jira-visualiser.s3.eu-west-2.amazonaws.com/index.html"
        }))

        req.end()
    })
};