import consola from 'consola'

import loadConfig, { Gitmoji } from '../config'
import loadGitmojis from '../gitmojis'
import parseLines from '../parseLines'

export function search(array: Gitmoji[], query?: string) {
  if (!query) {
    consola.error(`No query for search`)
    return false
  }
  const lines = parseLines(
    array.filter(({ name, description }) =>
      `${name}${description}`.includes(query)
    )
  )
  if (lines) {
    // eslint-disable-next-line no-console
    lines.forEach(line => console.log(line))
    return true
  }
  consola.error(`No gitmoji is found query "${query}"`)
  return false
}

export default async function(query?: string, configPath?: string) {
  search(await loadGitmojis(await loadConfig(configPath)), query)
}
