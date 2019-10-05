import chalk from 'chalk'

import gitmojis from '../gitmojis'
import parseLine from '../parseLine'

export default function(query?: string) {
  if (!query) return
  if (
    !parseLine(
      gitmojis.filter(({ name, description }) =>
        `${name}${description}`.includes(query)
      ),
      line => {
        const indexOf = line.indexOf(query)
        const { length } = query
        return [
          line.substring(0, indexOf),
          chalk.black.bgGreen.bold(line.substr(indexOf, length)),
          line.substring(indexOf + length)
        ].join('')
      }
    )
  )
    console.log(`${chalk.red`🚨 No gitmoji is found query`} ${query}`)
}
