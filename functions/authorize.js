// var https = require('https')

exports.handler = function (event, context) {
  return {
    statusCode: 200,
    body: 'OK'
  }
  // var state = event.queryStringParameters.state
  // var code = event.queryStringParameters.code

  // if (state !== 'check') {
  //   return {
  //     statusCode: 403
  //   }
  // }

  // var clientId = process.env.VIMEO_CLIENT_ID
  // var clientSecret = process.env.VIMEO_CLIENT_SECRET
  // var authToken = Buffer.from(clientId + ':' + clientSecret).toString('base64')

  // return new Promise(function(resolve, reject) {
  //   function handleError (error) {
  //     console.error(error)
  //     resolve({
  //       statusCode: 500,
  //       body: 'An error occurred'
  //     })
  //   }

  //   var request = https.request({
  //     hostname: 'api.vimeo.com',
  //     path: '/oauth/access_token',
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'basic ' + authToken,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/vnd.vimeo.*+json;version=3.4',
  //     }
  //   }, function (response) {
  //     var chunks = []

  //     response.on('data', function (chunk) {
  //       chunks.push(chunk)
  //     })

  //     response.on('end', function () {
  //       try {
  //         var body = Buffer.concat(chunks).toString()
  //         var data = JSON.parse(body)
  //         var accessToken = data.access_token

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

  //   request.on('error', function (error) {
  //     handleError(error)
  //   })

  //   request.write(JSON.stringify({
  //     grant_type: 'authorization_code',
  //     redirect_uri: 'https://vimeo-direct-link-access.netlify.app/.netlify/functions/authorize'
  //     code
  //   }))

  //   request.end()
  // })
}
