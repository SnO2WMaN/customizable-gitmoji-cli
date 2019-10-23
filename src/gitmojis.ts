import consola from 'consola'
import path from 'path'
import chalk from 'chalk'
import { Gitmoji, validate, Configuration } from './config'

export function parsePackageName(preset: string): string[] {
  if (preset.startsWith('@')) {
    const splits = preset.split('/')
    return splits.length === 3 // eslint-disable-line @typescript-eslint/no-magic-numbers
      ? [`${splits[0]}/${splits[1]}`, splits[2]]
      : [preset]
  }
  if (preset.startsWith('gitmoji-preset')) {
    return preset.split('/')
  }
  return parsePackageName(`gitmoji-preset-${preset}`)
}

export default async function({ presets, rules, order }: Configuration) {
  const gitmojis: Gitmoji[] = []
  if (presets) {
    const presetPaths = (Array.isArray(presets) ? presets : [presets]).map(
      preset =>
        path.resolve(process.cwd(), 'node_modules', ...parsePackageName(preset))
    )
    await Promise.all(
      presetPaths.map(async presetPath => {
        const { default: gitmojisOutput } = await import(presetPath)
        if (validate('rules', gitmojisOutput)) {
          gitmojis.push(...gitmojisOutput)
          consola.info(`Completed loading presets ${chalk.blue(presetPath)}`)
        }
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
