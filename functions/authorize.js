const https = require('https')
const crypto = require('crypto')

function encrypt (message) {
  const secret = process.env.MESSAGE_KEY
  const key = secret.repeat(32).substr(0, 32)
  const iv = secret.repeat(16).substr(0, 16)
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

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
    const handleError = error => {
      console.error(error)
      resolve({
        statusCode: 500,
        body: 'An error occurred'
      })
    }

    const options = {
      hostname: 'api.vimeo.com',
      path: '/oauth/access_token',
      method: 'POST',
      headers: {
        'Authorization': `basic ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      }
    }

    const request = https.request(options, response => {
      const chunks = []

      response.on('data', chunk => {
        chunks.push(chunk)
      })

      response.on('end', () => {
        try {
          const body = Buffer.concat(chunks).toString()
          const data = JSON.parse(body)
          const accessToken = data.access_token

          if (!accessToken) {
            throw new Error('No access token in response')
          }

          resolve({
            statusCode: 200,
            body: [
              'Your encrypted access token is:',
              encrypt(accessToken)
            ].join('\n')
          })
        } catch (error) {
          handleError(error)
        }
      })
    })

    request.on('error', error => {
      handleError(error)
    })

    request.write(
      JSON.stringify({
        grant_type: 'authorization_code',
        redirect_uri: 'https://vimeo-direct-link-access.netlify.app/.netlify/functions/authorize',
        code
      })
    )

    request.end()
  })
}
