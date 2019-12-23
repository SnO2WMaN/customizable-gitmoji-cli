import chalk from 'chalk'
import inquirer from 'inquirer'
import { GitmojiConfig } from 'cz-gitmoji-config-parser'

import withClient from './withClient'
import withHook from './withHook'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

export default async (config: GitmojiConfig, hook: boolean) => {
  const longestDescription = config
    .list()
    .reduce((c, { description }) => Math.max(c, description.length), 0)
  const gitmojiAnswer = (
    await inquirer.prompt([
      {
        name: 'gitmoji',
        message: 'Choose a gitmoji:',
        type: 'autocomplete',
        source: (_: any, input?: string) =>
          Promise.resolve(
            (input && input !== '' ? config.search(input) : config.list()).map(
              ({ emoji, name, description, tags }) => ({
                name: [
                  emoji,
                  ' '.repeat(2),
                  ' │ ',
                  description,
                  ' '.repeat(longestDescription - description.length),
                  ' │ ',
                  tags.length === 0
                    ? chalk.italic.grey('None')
                    : tags.map(tag => chalk.italic.blue(`${tag}`)).join(', ')
                ].join(''),
                value: name
              })
            )
          )
      }
    ])
  ).gitmoji as string
  const details = config.getByName(gitmojiAnswer)
  const longestScope = details.scopes.reduce(
    (c, { name }) => Math.max(c, name.length),
    0
  )
  let scopeAnswer = (
    await inquirer.prompt([
      {
        name: 'scope',
        message: 'Choose a scope:',
        type: 'list',
        choices: [
          ...details.scopes.map(({ name, description }) => ({
            name: [
              name,
              ' '.repeat(longestScope - name.length),
              ' │ ',
              description === ''
                ? chalk.gray('No description')
                : chalk.blue(description)
            ].join(''),
            value: name
          })),
          new inquirer.Separator(),
          { name: 'Custom.', value: '_custom' },
          { name: 'None.', value: null }
        ]
      }
    ])
  ).scope as string | null
  if (scopeAnswer === '_custom') {
    scopeAnswer = (
      await inquirer.prompt([
        {
          name: 'scope',
          message: 'Input custom scope:',
          type: 'input',
          validate: (scope: string) =>
            !scope ? chalk.red('Enter a valid scope') : true
        }
      ])
    ).scope
  }
  const maxTitleLength =
    72 -
    (config.emojiFormat === 'code' ? gitmojiAnswer.length : 1) - // emoji
    (scopeAnswer ? scopeAnswer.length + 2 : 0) - // scope
    1 // space
  const titleAnswer = (
    await inquirer.prompt([
      {
        name: 'title',
        message: 'Enter the commit title',
        validate: (title: string) =>
          !title ? chalk.red('Enter a valid commit title') : true,
        transformer: (input: string) => {
          return `[${input.length}/${maxTitleLength}]: ${input}`
        }
      }
    ])
  ).title as string
  const commitTitle = [
    config.emojiFormat === 'code' ? details.name : details.emoji,
    scopeAnswer ? `(${scopeAnswer})` : '',
    ' ',
    titleAnswer
  ]
    .join('')
    .trim()

  if (hook) withHook(commitTitle)
  else await withClient(config, commitTitle)
}
