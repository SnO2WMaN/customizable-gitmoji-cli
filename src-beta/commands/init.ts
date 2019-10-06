import fs from 'fs'
import consola from 'consola'

import getHookPath from '../getHookPath'

export default async function() {
  const hookPath = await getHookPath()
  fs.writeFile(
    hookPath,
    '#!/bin/sh\n# gitmoji as a commit hook\nexec < /dev/tty\ngitmoji --hook $1\n',
    { mode: 0o775 },
    e => {
      if (e) consola.error(e)
      consola.success('gitmoji commit hook created successfully.')
    }
  )
}
