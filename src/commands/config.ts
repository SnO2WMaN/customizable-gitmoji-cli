import consola from 'consola'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { ConfigKeys, setConfig, defaults, getConfigs } from '../config'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

export async function list() {
  const configs = await getConfigs()
  const longest = Object.keys(configs)
    .map(c => c.length)
    .reduce((accumulator, current) => Math.max(accumulator, current))
  Object.entries(configs).forEach(({ 0: key, 1: value }) => {
    consola.info(
      [
        key,
        ''.padStart(longest - key.length + 1, ' '),
        ': ',
        chalk.yellow(String(value))
      ].join('')
    )
  })
}

export default async function() {
  const answer = await inquirer.prompt([
    {
      name: ConfigKeys.AUTO_ADD,
      message: 'Enable automatic "git add ."',
      type: 'confirm',
      default: defaults[ConfigKeys.AUTO_ADD]
    },
    {
      name: ConfigKeys.EMOJI_FORMAT,
      message: 'Select how emojis should be used in commits',
      type: 'list',
      choices: [
        { name: ':smile:', value: 'code' },
        { name: '😄', value: 'emoji' }
      ],
      default: defaults[ConfigKeys.EMOJI_FORMAT]
    },
    {
      name: ConfigKeys.SIGNED_COMMIT,
      message: 'Enable signed commits',
      type: 'confirm',
      default: defaults[ConfigKeys.SIGNED_COMMIT]
    },
    {
      name: ConfigKeys.TITLE_MAX_LENGTH,
      message: 'Max length of commit title',
      type: 'number',
      validate: number => number > 0 && number <= 72,
      default: defaults[ConfigKeys.TITLE_MAX_LENGTH]
    }
  ])
  setConfig(ConfigKeys.AUTO_ADD, answer[ConfigKeys.AUTO_ADD])
  setConfig(ConfigKeys.EMOJI_FORMAT, answer[ConfigKeys.EMOJI_FORMAT])
  setConfig(ConfigKeys.SIGNED_COMMIT, answer[ConfigKeys.SIGNED_COMMIT])
  setConfig(ConfigKeys.TITLE_MAX_LENGTH, answer[ConfigKeys.TITLE_MAX_LENGTH])
}
