import inquirer from 'inquirer'
import chalk from 'chalk'
import consola from 'consola'
import execa from 'execa'
import fs from 'fs'
import { promisify } from 'util'

import config from '../config'
import getGitmojis from '../gitmojis'

const customScopeValue = 'CUSTOM_SCOPE'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

export default async function(hook?: boolean) {
  const gitmojis = await getGitmojis()
  const {
    emojiFormat,
    titleMaxLength,
    scopes,
    signedCommit,
    autoAdd
  } = await config()

  const { gitmoji: gitmojiAnswer } = await inquirer.prompt([
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      type: 'autocomplete',
      source: (answersSoFar: string, input: string) => {
        return Promise.resolve(
          gitmojis
            .filter(({ name, description }) => {
              return (
                !input ||
                `${name}${description}`
                  .toLowerCase()
                  .includes(input.toLowerCase())
              )
            })
            .map(gitmoji => ({
              name: `${gitmoji.emoji}  - ${gitmoji.description}`,
              value:
                emojiFormat === 'emoji' ? gitmoji.emoji : `:${gitmoji.name}:`
            }))
        )
      }
    }
  ])
  let scopeAnswer = (await inquirer.prompt([
    {
      name: 'scope',
      message: 'Choose a scope:',
      type: 'list',
      choices: [
        ...scopes,
        new inquirer.Separator(),
        { name: 'Custom scope.', value: customScopeValue },
        { name: 'No scope.', value: null }
      ]
    }
  ])).scope
  if (scopeAnswer === customScopeValue) {
    scopeAnswer = (await inquirer.prompt([
      {
        name: 'scope',
        message: 'Input custom scope:',
        type: 'input'
      }
    ])).scope
  }

  const { title: titleAnswer, message: messageAnswer } = await inquirer.prompt([
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: title =>
        !title || title.includes('`')
          ? chalk.red('Enter a valid commit title')
          : true,
      transformer: input => `[${input.length}/${titleMaxLength}]: ${input}`
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: message =>
        message.includes('`') ? chalk.red('Enter a valid commit message') : true
    }
  ])

  const prefix = `${gitmojiAnswer}${scopeAnswer ? `(${scopeAnswer})` : ''}`
  const commitTitle = `${prefix} ${titleAnswer}`
  const commitBody = `${messageAnswer}`
  if (hook) {
    try {
      await promisify(fs.writeFile)(
        process.argv[4],
        `${commitTitle}\n\n${commitBody}`
      )
    } catch (error) {
      consola.error(error)
    }
  } else {
    const commits = ['commit', '-m', commitTitle]
    if (commitBody) commits.push('-m', commitBody)
    if (signedCommit) commits.push('-S')
    if (autoAdd)
      await execa('git', ['add', '.'])
        .then(() => execa('git', commits))
        .then(responce => consola.info(chalk.blue(responce.stdout)))
        .catch(error => consola.error(error))
    else
      await execa('git', commits)
        .then(responce => consola.info(chalk.blue(responce.stdout)))
        .catch(error => consola.error(error))
  }
}
