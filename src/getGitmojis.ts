/* eslint-disable @typescript-eslint/no-require-imports, import/no-dynamic-require, global-require */

import cosmiconfig from 'cosmiconfig'

const explorer = cosmiconfig('gitmoji')

export default async function() {
  const result = await explorer.search()
  if (result && !result.isEmpty) {
    const gitmojis: Gitmoji[] = []
    const {
      config: { presets, rules, order }
    }: {
      config: {
        presets?: string | string[]
        rules?: Gitmoji[]
        order?: string[]
      }
    } = result
    if (presets) {
      ;(typeof presets === 'string' ? [presets] : presets).forEach(preset => {
        gitmojis.push(...require(`gitmoji-preset-${preset}`))
      })
    }
    if (rules) {
      gitmojis.push(...rules)
    }
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
  return require('gitmoji-preset-base') as Gitmoji[]
}

/* eslint-enable */
