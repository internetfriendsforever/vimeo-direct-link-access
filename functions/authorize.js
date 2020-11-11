// const https = require('https')

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

    resolve({
      statusCode: 200,
      body: code
    })

  //   const request = https.request({
  //     hostname: 'api.vimeo.com',
  //     path: '/oauth/access_token',
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `basic ${authToken}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/vnd.vimeo.*+json;version=3.4',
  //     }
  //   }, (response) => {
  //     const chunks = []

  //     response.on('data', chunk => {
  //       chunks.push(chunk)
  //     })

  //     response.on('end', () => {
  //       try {
  //         const body = Buffer.concat(chunks).toString()
  //         const data = JSON.parse(body)
  //         const accessToken = data.access_token

  //         if (!accessToken) {
  //           throw new Error('No access token in response')
  //         }

  //         resolve({
  //           statusCode: 200,
  //           body: [
  //             'Your secret access token is:',
  //             accessToken,
  //             '',
  //             'Handle with care.',
  //             'Share only with trusted parties.',
  //             'This token is only visible to you now.',
  //             'It is not stored or distributed anywhere.',
  //             '',
  //             'Note: You can revoke access through your Vimeo account settings.'
  //           ].join('\n')
  //         })
  //       } catch (error) {
  //         handleError(error)
  //       }
  //     })
  //   })

  //   request.on('error', error => {
  //     handleError(error)
  //   })

  //   request.write(JSON.stringify({
  //     grant_type: 'authorization_code',
  //     redirect_uri: 'https://vimeo-direct-link-access.netlify.app/.netlify/functions/authorize'
  //     code
  //   }))

  //   request.end()
  })
}
