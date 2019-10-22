import test from 'ava'

import loadConfig from '~/config'
import loadGitmojis from '~/gitmojis'

test('Should match to snapshot (No gitmoji presets)', async t => {
  t.snapshot(
    loadGitmojis(
      await loadConfig('tests/gitmojirc/correct/no-preset/.gitmojirc')
    )
  )
})

test('Should match to snapshot (gitmoji-preset-base)', async t => {
  t.snapshot(
    loadGitmojis(await loadConfig('tests/gitmojirc/correct/base/.gitmojirc'))
  )
})
