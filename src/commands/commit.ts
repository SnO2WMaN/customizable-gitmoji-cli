import inquirer from 'inquirer'
import chalk from 'chalk'
import consola from 'consola'
import execa from 'execa'
import fs from 'fs'

import { getConfig, ConfigKeys } from '../config'
import getGitmojis from '../getGitmojis'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

async function isNoStaged() {
  const { stdout } = await execa('git', ['diff', '--name-only', '--cached'])
  return stdout.split('\n').length - 1 < 1
}

export default async function(hook?: boolean) {
  const gitmojis = await getGitmojis()

  if (await isNoStaged()) {
    consola.error('No staged files!')
    return
  }

  const emojiFormat = await getConfig(ConfigKeys.EMOJI_FORMAT)
  const titleMaxLength = await getConfig(ConfigKeys.TITLE_MAX_LENGTH)
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
              value: gitmoji[emojiFormat]
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
      transformer: input => `[${input.length}/${titleMaxLength}]: ${input}`
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: message =>
        message.includes('`') ? chalk.red('Enter a valid commit message') : true
    }
  ])

  const commitTitle = `${answer.gitmoji} ${answer.title}`
  const commitBody = `${answer.message}`

  if (hook) {
    try {
      fs.writeFileSync(process.argv[4], `${commitTitle}\n\n${commitBody}`)
    } catch (error) {
      consola.error(error)
    }
  } else {
    const commits = ['commit', '-m', commitTitle]
    if (commitBody) commits.push('-m', commitBody)
    if (await getConfig(ConfigKeys.SIGNED_COMMIT)) commits.push('-S')
    if (await getConfig(ConfigKeys.AUTO_ADD))
      await execa('git', ['add', '.'])
        .then(() => execa('git', commits))
        .then(responce => consola.info(chalk.blue(responce.stdout)))
        .catch(error => consola.error(error))
    else
      execa('git', commits)
        .then(responce => consola.info(chalk.blue(responce.stdout)))
        .catch(error => consola.error(error))
  }
}
