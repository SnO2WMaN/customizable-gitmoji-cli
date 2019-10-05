const chalk = require('chalk')

const errors = {
  scope: chalk.red('Enter a valid scope'),
  title: chalk.red('Enter a valid commit title'),
  message: chalk.red('Enter a valid commit message')
}

module.exports = {
  scope: scope => (scope.includes('`') ? errors.scope : true),
  title: title => (!title || title.includes('`') ? errors.title : true),
  message: message => (message.includes('`') ? errors.message : true)
}
