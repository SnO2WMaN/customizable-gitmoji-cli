import fs from 'fs-extra'
import execa from 'execa'
import ora from 'ora'

import hook from '../hook'

export default async () => {
  const spinner = ora('Creating the gitmoji commit hook').start()

  try {
    const { stdout } = await execa('git', ['rev-parse', '--absolute-git-dir'])
    await fs.unlink(stdout + hook.path)
    spinner.succeed('Gitmoji commit hook removed successfully')
  } catch (error) {
    spinner.fail(`Error: ${String(error)}`)
  }
}
