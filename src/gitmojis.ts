import { Gitmoji, validate, Configuration } from './config'

export function parsePackageName(preset: string): string {
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
