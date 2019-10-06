import fs from 'fs'
import consola from 'consola'

import getHookPath from '../getHookPath'

export default async function() {
  const hookPath = await getHookPath()
  fs.unlink(hookPath, e => {
    if (e) consola.error(e)
    consola.success('gitmoji commit hook unlinked successfully.')
  })
}
