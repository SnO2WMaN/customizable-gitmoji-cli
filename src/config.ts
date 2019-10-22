import cosmiconfig from 'cosmiconfig'

const configExplorer = cosmiconfig('gitmoji', { cache: false })

type Config = {
  autoAdd: boolean
  emojiFormat: 'emoji' | 'code'
  signedCommit: boolean
  titleMaxLength: number
  presets: string[] | string | null
  rules: Gitmoji[]
  scopes: []
  order: string[]
}

function validateGitmoji(value: unknown): value is Gitmoji {
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

function validate<T extends keyof Config>(
  key: T,
  value: unknown
): value is Config[T] {
  // eslint-disable-next-line default-case
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
      return typeof value === 'number' && value > 0 && value <= 72
    case 'presets':
      return (
        typeof value === 'string' ||
        (Array.isArray(value) && value.every(v => typeof v === 'string'))
      )
    case 'rules':
      return Array.isArray(value) && value.every(v => validateGitmoji(v))
    case 'order':
      return Array.isArray(value) && value.every(v => typeof v === 'string')
    case 'scopes':
      return Array.isArray(value) && value.every(v => typeof v === 'string')
  }
  throw new Error(`The given config ${key} does not meet the conditions.`)
}

const defaultConfig: Config = {
  autoAdd: false,
  emojiFormat: 'code',
  signedCommit: false,
  titleMaxLength: 48,
  order: [],
  rules: [],
  scopes: [],
  presets: 'base'
}

let cache: Config | undefined

export async function saveConfig(searchFrom?: string) {
  const result = await configExplorer.search(searchFrom)
  if (result && !result.isEmpty) {
    if ('rules' in result.config && validate('rules', result.config.rules))
      defaultConfig.presets = null

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
    validate('presets', presets)
    validate('scopes', scopes)

    cache = {
      autoAdd,
      emojiFormat,
      signedCommit,
      titleMaxLength,
      rules,
      order,
      presets,
      scopes
    }
    return cache
  }
  return defaultConfig
}

export default function() {
  if (!cache) throw new Error('Something wrong.')
  return cache
}
