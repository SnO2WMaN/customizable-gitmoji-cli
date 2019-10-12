import explorer from './configExplorer'

export enum ConfigKeys {
  AUTO_ADD = 'autoAdd',
  EMOJI_FORMAT = 'emojiFormat',
  SIGNED_COMMIT = 'signedCommit',
  TITLE_MAX_LENGTH = 'titleMaxLength'
}

type Config = {
  [ConfigKeys.AUTO_ADD]: boolean
  [ConfigKeys.EMOJI_FORMAT]: 'emoji' | 'code'
  [ConfigKeys.SIGNED_COMMIT]: boolean
  [ConfigKeys.TITLE_MAX_LENGTH]: number
}

function valid<T extends ConfigKeys>(
  key: T,
  value: unknown
): value is Config[T] {
  switch (key) {
    case ConfigKeys.AUTO_ADD:
      return typeof value === 'boolean'
    case ConfigKeys.EMOJI_FORMAT:
      return value === 'emoji' || value === 'code'
    case ConfigKeys.SIGNED_COMMIT:
      return typeof value === 'boolean'
    case ConfigKeys.TITLE_MAX_LENGTH:
      return typeof value === 'number' && value > 0 && value <= 72
    default:
      throw new Error(`Invalid key : ${key}`)
  }
}

export const defaults = {
  [ConfigKeys.AUTO_ADD]: false,
  [ConfigKeys.EMOJI_FORMAT]: 'code',
  [ConfigKeys.SIGNED_COMMIT]: false,
  [ConfigKeys.TITLE_MAX_LENGTH]: 48
}

export async function getConfig<T extends ConfigKeys>(
  key: T
): Promise<Config[T]> {
  const result = await explorer.search()
  if (result && !result.isEmpty && result.config[key]) {
    const value = result.config[key]
    return valid(key, value)
      ? value
      : Promise.reject(
          new Error(
            `${key} must be ${
              key === ConfigKeys.EMOJI_FORMAT
                ? '"code" / "emoji"'
                : key === ConfigKeys.TITLE_MAX_LENGTH
                ? 'Number (0 < n <= 72)'
                : 'Boolean'
            }`
          )
        )
  }
  return new Promise(() => defaults[key])
}

export async function getConfigs(): Promise<Config> {
  return {
    [ConfigKeys.AUTO_ADD]: await getConfig(ConfigKeys.AUTO_ADD),
    [ConfigKeys.EMOJI_FORMAT]: await getConfig(ConfigKeys.EMOJI_FORMAT),
    [ConfigKeys.SIGNED_COMMIT]: await getConfig(ConfigKeys.SIGNED_COMMIT),
    [ConfigKeys.TITLE_MAX_LENGTH]: await getConfig(ConfigKeys.TITLE_MAX_LENGTH)
  }
}
