import fs from 'fs'
import consola from 'consola'

import getHookPath from '../getHookPath'

export default async function() {
  const hookPath = await getHookPath()
  if (!hookPath) return
  fs.writeFile(
    hookPath,
    '#!/bin/sh\n# gitmoji as a commit hook\nexec < /dev/tty\ngitmoji --hook $1\n',
    { mode: 0o775 },
    error => {
      if (error) consola.error(error)
      consola.success('gitmoji commit hook created successfully.')
    }
  )
}
