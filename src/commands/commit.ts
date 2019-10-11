import inquirer from 'inquirer'
import chalk from 'chalk'
import SimpleGit from 'simple-git/promise'
import consola from 'consola'

import { getConfig, ConfigKeys } from '../config'
import gitmojis from '../gitmojis'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

const git = SimpleGit()

export default async function() {
  if ((await git.diff(['--name-only', '--cached'])).split('\n').length <= 1) {
    consola.error('No staged files!')
    return
  }

  const answer = await inquirer.prompt([
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
              value: gitmoji[getConfig(ConfigKeys.EMOJI_FORMAT)]
            }))
        )
      }
    },
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: title =>
        !title || title.includes('`')
          ? chalk.red('Enter a valid commit title')
          : true,
      transformer: input =>
        `[${input.length}/${getConfig(ConfigKeys.TITLE_MAX_LENGTH)}]: ${input}`
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: message =>
        message.includes('`') ? chalk.red('Enter a valid commit message') : true
    }
  ])

  if (getConfig(ConfigKeys.AUTO_ADD)) await git.add('.')

  try {
    const { commit } = await git.commit([
      `${answer.gitmoji} ${answer.title}`,
      answer.message
    ])
    consola.success('Commit success!')
    ;(await git.show([commit, '--shortstat', '--pretty=%an | %s']))
      .split('\n')
      .forEach(line => {
        consola.info(line)
      })
  } catch (error) {
    consola.error('Commit failed!')
    consola.error(error)
  }
}
