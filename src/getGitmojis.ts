/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require */

import explorer from './configExplorer'

export function getFromConfig(
  defaults: Gitmoji[],
  config?: {
    presets?: string | string[]
    rules?: Gitmoji[]
    order?: string[]
  }
) {
  if (!config) return defaults
  const { presets, rules, order } = config
  const gitmojis: Gitmoji[] = []
  if (presets) {
    ;(typeof presets === 'string' ? [presets] : presets).forEach(preset => {
      gitmojis.push(...require(`gitmoji-preset-${preset}`))
    })
  }
  if (rules) gitmojis.push(...rules)
  if (gitmojis.length === 0) return defaults
  if (order)
    return [
      ...gitmojis
        .filter(({ name }) => order.includes(name))
        .sort(
          ({ name: a }, { name: b }) => order.indexOf(a) - order.indexOf(b)
        ),
      ...gitmojis.filter(({ name }) => !order.includes(name))
    ]
  return gitmojis
}

export default async function() {
  const defaults: Gitmoji[] = require('gitmoji-preset-base')
  const result = await explorer.search()
  if (result && !result.isEmpty) return getFromConfig(defaults, result.config)
  return defaults
}

/* eslint-enable */
