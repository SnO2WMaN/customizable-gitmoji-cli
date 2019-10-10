import Conf from 'conf'

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

export const defaults = {
  [ConfigKeys.AUTO_ADD]: false,
  [ConfigKeys.EMOJI_FORMAT]: 'code',
  [ConfigKeys.SIGNED_COMMIT]: false,
  [ConfigKeys.TITLE_MAX_LENGTH]: 48
}

export function getConfig<T extends ConfigKeys>(key: T): Config[T] {
  return config.get(key, defaults[key])
}

export function getConfigs(): Config {
  return {
    [ConfigKeys.AUTO_ADD]: getConfig(ConfigKeys.AUTO_ADD),
    [ConfigKeys.EMOJI_FORMAT]: getConfig(ConfigKeys.EMOJI_FORMAT),
    [ConfigKeys.SIGNED_COMMIT]: getConfig(ConfigKeys.SIGNED_COMMIT),
    [ConfigKeys.TITLE_MAX_LENGTH]: getConfig(ConfigKeys.TITLE_MAX_LENGTH)
  }
}

export function setConfig<T extends ConfigKeys>(key: T, value: Config[T]) {
  config.set(key, value)
}
