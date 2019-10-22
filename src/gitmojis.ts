/* eslint-disable @typescript-eslint/no-require-imports, import/no-dynamic-require, global-require */

import config from './config'

type PresetName = string

export function isCorrectPresetName(value: unknown): value is PresetName {
  if (typeof value !== 'string') return false
  if (value.startsWith('@')) return /^@.+\/gitmoji-preset(\/.+)?$/.test(value)
  if (value.startsWith('gitmoji-preset'))
    return /^gitmoji-preset-.+$/.test(value)
  return /.+(\/.+)?/.test(value)
}

export default async function() {
  const { presets, rules, order } = await config()

  const gitmojis = []
  if (presets) {
    ;(Array.isArray(presets) ? presets : [presets]).forEach(preset => {
      gitmojis.push(...require(`gitmoji-preset-${preset}`))
    })
  }
  gitmojis.push(...rules)
  return [
    ...gitmojis
      .filter(({ name }) => order.includes(name))
      .sort(({ name: a }, { name: b }) => order.indexOf(a) - order.indexOf(b)),
    ...gitmojis.filter(({ name }) => !order.includes(name))
  ]
}

/* eslint-enable */
