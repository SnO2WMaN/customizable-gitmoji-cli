import chalk from 'chalk'

import { Gitmoji } from './config'

export function parseLine(
  { emoji, name, description }: Gitmoji,
  longest: number
) {
  const line = [
    emoji,
    ' - ',
    chalk.blue(`:${name}:`),
    ''.padStart(longest - name.length + 1, ' '),
    '│ ',
    description
  ].join('')
  return line
}

export default function(gitmojis?: Gitmoji[]) {
  if (!gitmojis || gitmojis.length <= 0) return false

  const longest = gitmojis
    .map(({ name }) => name.length)
    .reduce((accumulator, current) => Math.max(accumulator, current))
  return gitmojis.map(gitmoji => parseLine(gitmoji, longest))
}
