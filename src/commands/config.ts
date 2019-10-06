import Conf from 'conf'
import inquirer from 'inquirer'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

const config = new Conf()

export enum ConfigKeys {
  AUTO_ADD = 'auto_add',
  EMOJI_FORMAT = 'emoji_format',
  SIGNED_COMMIT = 'signed_commit',
  TITLE_MAX_LENGTH = 'title_max_length'
}

type Config = {
  [ConfigKeys.AUTO_ADD]: boolean
  [ConfigKeys.EMOJI_FORMAT]: 'emoji' | 'code'
  [ConfigKeys.SIGNED_COMMIT]: boolean
  [ConfigKeys.TITLE_MAX_LENGTH]: number
}

export function getConfig(): Config {
  return {
    [ConfigKeys.AUTO_ADD]: config.get(ConfigKeys.AUTO_ADD, false),
    [ConfigKeys.EMOJI_FORMAT]: config.get(ConfigKeys.EMOJI_FORMAT, 'code'),
    [ConfigKeys.SIGNED_COMMIT]: config.get(ConfigKeys.SIGNED_COMMIT, false),
    [ConfigKeys.TITLE_MAX_LENGTH]: config.get(ConfigKeys.TITLE_MAX_LENGTH, 48)
  }
}

export default async function() {
  const answer = await inquirer.prompt([
    {
      name: ConfigKeys.AUTO_ADD,
      message: 'Enable automatic "git add ."',
      type: 'confirm'
    },
    {
      name: ConfigKeys.EMOJI_FORMAT,
      message: 'Select how emojis should be used in commits',
      type: 'list',
      choices: [
        { name: ':smile:', value: 'code' },
        { name: '😄', value: 'emoji' }
      ]
    },
    {
      name: ConfigKeys.SIGNED_COMMIT,
      message: 'Enable signed commits',
      type: 'confirm'
    },
    {
      name: ConfigKeys.TITLE_MAX_LENGTH,
      message: 'Max length of commit title',
      type: 'number',
      validate: number => number > 0 && number <= 72,
      default: 48
    }
  ])
  config.set(ConfigKeys.AUTO_ADD, answer[ConfigKeys.AUTO_ADD])
  config.set(ConfigKeys.EMOJI_FORMAT, answer[ConfigKeys.EMOJI_FORMAT])
  config.set(ConfigKeys.SIGNED_COMMIT, answer[ConfigKeys.SIGNED_COMMIT])
  config.set(ConfigKeys.TITLE_MAX_LENGTH, answer[ConfigKeys.TITLE_MAX_LENGTH])
}
