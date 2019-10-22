import cosmiconfig from 'cosmiconfig'

const GIT_COMMIT_TITLE_MAX_LENGTH = 72

const configExplorer = cosmiconfig('gitmoji', { cache: false })

export type Gitmoji = {
  emoji: string
  description: string
  name: string
}

export type Configuration = {
  autoAdd: boolean
  emojiFormat: 'emoji' | 'code'
  signedCommit: boolean
  titleMaxLength: number
  presets: string[] | string | null
  rules: Gitmoji[]
  scopes: []
  order: string[]
}

type PresetName = string
export function validatePresetName(value: unknown): value is PresetName {
  if (typeof value !== 'string') return false
  if (value.startsWith('@')) return /^@.+\/gitmoji-preset(\/.+)?$/.test(value)
  if (value.startsWith('gitmoji-preset'))
    return /^gitmoji-preset-.+$/.test(value)
  return /.+(\/.+)?/.test(value)
}

export function validateGitmoji(value: unknown): value is Gitmoji {
  if (typeof value === 'object' && value) {
    if (!('emoji' in value && 'name' in value && 'description' in value))
      return false
    if (typeof (value as { emoji: unknown }).emoji !== 'string') return false
    if (typeof (value as { name: unknown }).name !== 'string') return false
    if (typeof (value as { description: unknown }).description !== 'string')
      return false
    return true
  }
  return false
}

export function validate<T extends keyof Configuration>(
  key: T,
  value: unknown
): value is Configuration[T] {
  if (
    !(() => {
      switch (key) {
        case 'autoAdd':
          return typeof value === 'boolean'
        case 'emojiFormat':
          return (
            typeof value === 'string' && (value === 'emoji' || value === 'code')
          )
        case 'signedCommit':
          return typeof value === 'boolean'
        case 'titleMaxLength':
          return (
            typeof value === 'number' &&
            value > 0 &&
            value <= GIT_COMMIT_TITLE_MAX_LENGTH
          )
        case 'presets':
          return (
            typeof value === 'string' ||
            (Array.isArray(value) && value.every(validatePresetName))
          )
        case 'rules':
          return Array.isArray(value) && value.every(v => validateGitmoji(v))
        case 'order':
          return Array.isArray(value) && value.every(v => typeof v === 'string')
        case 'scopes':
          return Array.isArray(value) && value.every(v => typeof v === 'string')
        default:
          throw new TypeError(`The given key "${key}" is not config key.`)
      }
    })()
  ) {
    throw new Error(`The given config ${key} does not meet the conditions.`)
  }
  return true
}

const defaultConfig: Configuration = {
  autoAdd: false,
  emojiFormat: 'code',
  signedCommit: false,
  titleMaxLength: 48,
  order: [],
  rules: [],
  scopes: [],
  presets: 'base'
}

export default async function(configPath?: string) {
  const result = configPath
    ? await configExplorer.load(configPath)
    : await configExplorer.search()
  if (result && !result.isEmpty) {
    const {
      autoAdd,
      emojiFormat,
      signedCommit,
      titleMaxLength,
      rules,
      order,
      presets,
      scopes
    } = Object.assign(defaultConfig, result.config)

    validate('autoAdd', autoAdd)
    validate('emojiFormat', emojiFormat)
    validate('signedCommit', signedCommit)
    validate('titleMaxLength', titleMaxLength)
    validate('order', order)
    if (presets) validate('presets', presets)
    validate('scopes', scopes)

    return {
      autoAdd,
      emojiFormat,
      signedCommit,
      titleMaxLength,
      rules,
      order,
      presets,
      scopes
    }
  }
  return defaultConfig
}
