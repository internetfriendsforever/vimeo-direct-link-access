const https = require('https')

exports.handler = async function (event, context) {
  const { state, code } = event.queryStringParameters

  if (state !== 'check') {
    return {
      statusCode: 403
    }
  }

  const clientId = process.env.VIMEO_CLIENT_ID
  const clientSecret = process.env.VIMEO_CLIENT_SECRET
  const authToken = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.vimeo.com',
      path: '/oauth/access_token',
      method: 'POST',
      headers: {
        'Authorization': `basic ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
      }
    }, (response) => {
      const chunks = []

      response.on('data', chunk => {
        chunks.push(chunk)
      })

      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          body: Buffer.concat(chunks).toString()
        })
      })
    })

    request.on('error', error => resolve({
      statusCode: 500,
      error: error.message
    }))

    request.write(JSON.stringify({
      grant_type: "authorization_code",
      redirect_uri: "https://vimeo-direct-link-access.netlify.app/.netlify/functions/authorize"
      code
    }))

    request.end()
  })
}
