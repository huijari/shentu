const { prompt, registerPrompt } = require('inquirer')
const { test } = require('fuzzy')
const autocomplete = require('inquirer-autocomplete-prompt')

registerPrompt('autocomplete', autocomplete)

function readInput({ services }) {
  const source = async (_, input) => {
    if (input === undefined) return services
    return services.filter(name => test(input, name))
  }

  return prompt([
    {
      type: 'autocomplete',
      name: 'service',
      message: 'Service',
      source
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password'
    }
  ])
}

module.exports = { readInput }
