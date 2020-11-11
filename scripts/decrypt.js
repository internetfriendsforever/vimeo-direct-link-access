const crypto = require('crypto')

const [secret, message] = process.argv.slice(2)

const key = secret.repeat(32).substr(0, 32)
const iv = secret.repeat(16).substr(0, 16)
const decipher = crypto.createDecipheriv('aes-256-ctr', secret, iv)
let decrypted = decipher.update(text, 'hex', 'utf8')
decrypted += decipher.final('utf8')

console.log(decrypted)
