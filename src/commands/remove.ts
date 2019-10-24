import fs from 'fs-extra'
import consola from 'consola'

import getHookPath from '../getHookPath'

export default async function() {
  const hookPath = await getHookPath()
  if (!hookPath) return
  fs.unlink(hookPath, error => {
    if (error) consola.error(error)
    consola.success('gitmoji commit hook unlinked successfully.')
  })
}
