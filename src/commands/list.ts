import loadConfig, { Gitmoji } from '../config'
import loadGitmojis from '../gitmojis'
import parseLines from '../parseLines'

export function list(array: Gitmoji[]) {
  const lines = parseLines(array)
  // eslint-disable-next-line no-console
  if (lines) lines.forEach(line => console.log(line))
}

export default async function(configPath?: string) {
  list(await loadGitmojis(await loadConfig(configPath)))
}
