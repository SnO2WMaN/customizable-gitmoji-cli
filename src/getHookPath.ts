import path from 'path'
import consola from 'consola'
import execa from 'execa'

export default async function() {
  try {
    const { stdout: gitPath } = await execa('git', [
      'rev-parse',
      '--absolute-git-dir'
    ])
    return path.join(gitPath.trim(), '/hooks/prepare-commit-msg')
  } catch (error) {
    consola.error(error)
    return false
  }
}
