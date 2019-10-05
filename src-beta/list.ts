import chalk from 'chalk'

import gitmojis from './gitmojis'

export default function() {
  const longest = gitmojis
    .map(({ code }) => code.length)
    .reduce((acc, cur) => Math.max(acc, cur))
  gitmojis.forEach(({ emoji, code, description }) => {
    console.log(
      [
        emoji,
        ' - ',
        chalk.blue(code),
        ''.padStart(longest - code.length + 1, ' '),
        '│ ',
        description
      ].join('')
    )
  })
}
