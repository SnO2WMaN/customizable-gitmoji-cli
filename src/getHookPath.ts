import path from 'path'
import SimpleGit from 'simple-git/promise'
import consola from 'consola'

const git = SimpleGit()

export default async function() {
  try {
    const gitPath = await git.revparse(['--absolute-git-dir'])
    return path.join(await gitPath, '/hooks/prepare-commit-msg')
  } catch (error) {
    consola.error(error)
    return false
  }
}
