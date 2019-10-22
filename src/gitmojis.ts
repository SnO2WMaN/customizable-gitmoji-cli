import config, { Gitmoji, validate, Configuration } from './config'

type PresetName = string

export function isCorrectPresetName(value: unknown): value is PresetName {
  if (typeof value !== 'string') return false
  if (value.startsWith('@')) return /^@.+\/gitmoji-preset(\/.+)?$/.test(value)
  if (value.startsWith('gitmoji-preset'))
    return /^gitmoji-preset-.+$/.test(value)
  return /.+(\/.+)?/.test(value)
}

export function parsePackageName(preset: PresetName): string {
  if (preset.startsWith('@')) return preset
  if (preset.startsWith('gitmoji-preset')) return preset
  return `gitmoji-preset-${preset}`
}

export default async function({ presets, rules, order }: Configuration) {
  const gitmojis: Gitmoji[] = []
  if (presets) {
    await Promise.all(
      (Array.isArray(presets) ? presets : [presets]).map(async preset => {
        const { default: gitmojisOutput } = await import(
          parsePackageName(preset)
        )
        if (validate('rules', gitmojisOutput)) gitmojis.push(...gitmojisOutput)
      })
    )
  }
  gitmojis.push(...rules)
  return [
    ...gitmojis
      .filter(({ name }) => order.includes(name))
      .sort(({ name: a }, { name: b }) => order.indexOf(a) - order.indexOf(b)),
    ...gitmojis.filter(({ name }) => !order.includes(name))
  ]
}
