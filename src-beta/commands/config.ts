import Conf from 'conf'
import inquirer from 'inquirer'

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

const config = new Conf()

enum ConfigKeys {
  AUTO_ADD = 'auto_add',
  EMOJI_FORMAT = 'emoji_format',
  SIGNED_COMMIT = 'signed_commit'
}

type Config = {
  [ConfigKeys.AUTO_ADD]: boolean
  [ConfigKeys.EMOJI_FORMAT]: 'emoji' | 'code'
  [ConfigKeys.SIGNED_COMMIT]: boolean
}

export function getConfig(): Config {
  return {
    [ConfigKeys.AUTO_ADD]: config.get(ConfigKeys.AUTO_ADD, false),
    [ConfigKeys.EMOJI_FORMAT]: config.get(ConfigKeys.AUTO_ADD, 'code'),
    [ConfigKeys.SIGNED_COMMIT]: config.get(ConfigKeys.AUTO_ADD, false)
  }
}

export default async function() {
  const answer = await inquirer.prompt([
    {
      name: 'autoAdd',
      message: 'Enable automatic "git add ."',
      type: 'confirm'
    },
    {
      name: 'emojiFormat',
      message: 'Select how emojis should be used in commits',
      type: 'list',
      choices: [
        { name: ':smile:', value: 'code' },
        { name: '😄', value: 'emoji' }
      ]
    },
    {
      name: 'signedCommit',
      message: 'Enable signed commits',
      type: 'confirm'
    }
  ])
  config.set(ConfigKeys.AUTO_ADD, answer.autoAdd)
  config.set(ConfigKeys.EMOJI_FORMAT, answer.emojiFormat)
  config.set(ConfigKeys.SIGNED_COMMIT, answer.signedCommit)
}
