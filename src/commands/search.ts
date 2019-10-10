import chalk from 'chalk'
import consola from 'consola'

import gitmojis from '../gitmojis'
import parseLines from '../parseLines'

export default function(query?: string) {
  if (!query) return
  if (
    !parseLines(
      gitmojis.filter(({ name, description }) =>
        `${name}${description}`.includes(query)
      )
    )
  )
    consola.error(`No gitmoji is found query "${query}"`)
}
