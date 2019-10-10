import gitmojis from '../gitmojis'

import parseLines from '../parseLines'

export function list(array: Gitmoji[]) {
  const lines = parseLines(array)
  // eslint-disable-next-line no-console
  if (lines) lines.forEach(line => console.log(line))
}

export default function() {
  list(gitmojis)
}
