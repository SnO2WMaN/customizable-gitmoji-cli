import chalk from 'chalk'

export function parseLine(
  { emoji, code, description }: Gitmoji,
  longest: number
) {
  const line = [
    emoji,
    ' - ',
    chalk.blue(code),
    ''.padStart(longest - code.length + 1, ' '),
    '│ ',
    description
  ].join('')
  return line
}

export default function(gitmojis?: Gitmoji[]) {
  if (!gitmojis || gitmojis.length <= 0) return false

  const longest = gitmojis
    .map(({ code }) => code.length)
    .reduce((accumulator, current) => Math.max(accumulator, current))
  return gitmojis.map(gitmoji => parseLine(gitmoji, longest))
}
