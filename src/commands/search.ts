import consola from 'consola'

import { Gitmoji } from '../config'
import getGitmojis from '../gitmojis'
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

export default async function(query?: string) {
  search(await getGitmojis(), query)
}
