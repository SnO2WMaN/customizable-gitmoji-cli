import chalk from 'chalk'
import consola from 'consola'

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
    consola.error(`No gitmoji is found query "${query}"`)
}
