const { parse } = require('toml')
const { readFileSync } = require('fs')
const ow = require('ow')

function validate({ salt, timeout, services }) {
  ow(salt, ow.string.label('salt').nonEmpty)
  ow(timeout, ow.number.label('timeout').integer.greaterThanOrEqual(0))
  ow(services, ow.array.label('service'))
  for ({ name, version, length } of services) {
    ow(name, ow.string.label('name').nonEmpty)
    ow(version, ow.number.label('version').positive.integer)
    ow(length, ow.number.label('length').positive.integer)
  }
}

function readMeta(path) {
  const { salt, timeout, service: services } = parse(readFileSync(path))
  const data = { salt, timeout, services }
  validate(data)
  return data
}

module.exports = { readMeta }
