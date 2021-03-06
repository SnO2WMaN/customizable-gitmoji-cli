/* eslint-disable no-console */
import chalk from 'chalk'

import { GitmojiConfig } from 'customizable-gitmoji-config-parser'

export default async function(config: GitmojiConfig) {
  const list = config.list()
  const longestName = list.reduce((c, { name }) => Math.max(c, name.length), 0)
  const longestDescription = list.reduce(
    (c, { description }) => Math.max(c, description.length),
    0
  )
  const separator = ` ${chalk.grey('│')} `
  list.forEach(({ emoji, name, description, tags, scopes }) => {
    console.log(
      [
        emoji,
        ' '.repeat(2),
        chalk.bold.cyan(`:${name}:`),
        ' '.repeat(longestName - name.length),
        separator,
        description,
        ' '.repeat(longestDescription - description.length),
        separator,
        tags.length === 0
          ? chalk.italic.grey('None')
          : tags.map(tag => chalk.italic.blue(`${tag}`)).join(', ')
      ].join('')
    )
    const longestScope = scopes.reduce(
      (c, { name: scopeName }) => Math.max(c, scopeName.length),
      0
    )
    scopes.forEach(({ name: scopeName, description: scopeDescription }, i) => {
      console.log(
        [
          i === scopes.length - 1 ? '└' : '├',
          '─ ',
          chalk.blue(`(${scopeName})`),
          ' '.repeat(longestScope - scopeName.length),
          separator,
          scopeDescription === ''
            ? chalk.grey('No description')
            : chalk.white(scopeDescription)
        ].join('')
      )
    })
  })
}
/* eslint-enable no-console */
