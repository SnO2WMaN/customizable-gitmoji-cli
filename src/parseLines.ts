import chalk from 'chalk'

type Gitmoji = {
  emoji: string
  entity?: string // fix later
  code: string
  description: string
  name: string
}

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
    .reduce((acc, cur) => Math.max(acc, cur))
  gitmojis.forEach(gitmoji => {
    // eslint-disable-next-line no-console
    console.log(parseLine(gitmoji, longest))
  })

  return true
}
