import cac from 'cac'
import update from 'update-notifier'

import pkg from '../package.json'

import commitCommand from './commands/commit'
import listCommand from './commands/list'
import searchCommand from './commands/search'
import initCommand from './commands/init'
import removeCommand from './commands/remove'

update({ pkg }).notify()

const cli = cac('gitmoji')

cli.command('init', 'Initialize gitmoji as a commit hook').action(initCommand)
cli
  .command('remove', 'Remove a previously initialized commit hook')
  .action(removeCommand)

cli
  .command('commit', 'Interactively commit using the prompts')
  .option('--hook', 'This option is used internally (DO NOT USE)')
  .option(
    '-c, --config <config>',
    'Location of .gitmojirc (or gitmoji setting) file'
  )
  .action(async ({ config, hook }) => {
    await commitCommand(config, hook || false)
  })

cli
  .command('list', 'List all the available gitmojis')
  .option(
    '-c, --config <config>',
    'Location of .gitmojirc (or gitmoji setting) file'
  )
  .action(async ({ config }) => {
    await listCommand(config)
  })
cli
  .command('search [query]', 'Search gitmojis')
  .option(
    '-c, --config <config>',
    'Location of .gitmojirc (or gitmoji setting) file'
  )
  .action(async (query, { config }) => {
    await searchCommand(query, config)
  })

cli.version(pkg.version)
cli.help()

cli.parse()
