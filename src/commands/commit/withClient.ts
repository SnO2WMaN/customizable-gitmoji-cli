import execa from 'execa'
import { GitmojiConfig } from 'cz-gitmoji-config-parser'

export default async (config: GitmojiConfig, title: string) => {
  try {
    if (config.autoAdd) await execa('git', ['add', '.'])
    const { stdout } = await execa('git', [
      'commit',
      ...(config.signedCommit ? ['-S'] : []),
      '-m',
      `${title}`
    ])
    console.log(stdout)
  } catch (error) {
    console.error(error)
  }
}
