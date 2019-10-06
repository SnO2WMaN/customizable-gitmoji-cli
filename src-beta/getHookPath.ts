import path from 'path'
import SimpleGit from 'simple-git/promise'

const git = SimpleGit()

export default async function() {
  return path.join(
    await git.revparse(['--absolute-git-dir']),
    '/hooks/prepare-commit-msg'
  )
}
