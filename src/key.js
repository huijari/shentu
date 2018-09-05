const { pbkdf2 } = require('crypto')

function generate({ service, password, salt, version, length }) {
  return new Promise((resolve, reject) => {
    pbkdf2(
      `${service}:${password}`,
      salt,
      100000 + version,
      length,
      'sha512',
      (error, key) => {
        if (error) reject(error)
        resolve(key.toString('base64'))
      }
    )
  })
}

module.exports = { generate }
