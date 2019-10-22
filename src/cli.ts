import cac from 'cac'
import update from 'update-notifier'

import pkg from '../package.json'

import commit from './commands/commit'
import list from './commands/list'
import search from './commands/search'
import init from './commands/init'
import remove from './commands/remove'

import { saveConfig } from './config'

update({ pkg }).notify()

const cli = cac(pkg.name)

cli
  .command('list', 'List all the available gitmojis')
  .option(
    '-c, --config <config>',
    'Location of .gitmojirc (or gitmoji setting) file'
  )
  .action(async ({ config }) => {
    await saveConfig(config)
    await list()
  })
cli
  .command('search [query]', 'Search gitmojis')
  .option(
    '-c, --config <config>',
    'Location of .gitmojirc (or gitmoji setting) file'
  )
  .action(async ({ config }) => {
    await saveConfig(config)
    await search()
  })

cli
  .command('commit', 'Interactively commit using the prompts')
  .option('--hook', 'Option for git hook')
  .option(
    '-c, --config <config>',
    'Location of .gitmojirc (or gitmoji setting) file'
  )
  .action(async ({ config, hook }) => {
    await saveConfig(config)
    await commit(hook || false)
  })

cli.command('init', 'Initialize gitmoji as a commit hook').action(init)
cli
  .command('remove', 'Remove a previously initialized commit hook')
  .action(remove)

cli.version(pkg.version)
cli.help()

cli.parse()
