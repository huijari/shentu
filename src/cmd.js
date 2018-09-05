const { readFileSync } = require('fs')
const { green, red } = require('chalk')
const { writeSync } = require('clipboardy')

const { readMeta } = require('./meta')
const { readInput } = require('./input')
const { generate } = require('./key')

async function run() {
  try {
    const { salt, timeout, services } = readMeta('shentu.toml')
    const { service, password } = await readInput({ services })
    const { version, bytes } = services.find(({ name }) => service === name)
    const key = await generate({ service, password, salt, version, length })

    writeSync(key)
    console.log(green('Password copied to clipboard!'))
    if (timeout !== 0) {
      console.log(`Clearing clipboard in ${timeout}s`)
      setTimeout(() => writeSync(''), timeout * 1000)
    }
  } catch (error) {
    console.log(red(error.toString()))
  }
}

module.exports = { run }
