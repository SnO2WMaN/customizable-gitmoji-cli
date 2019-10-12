import cac from 'cac'
import update from 'update-notifier'

import pkg from '../package.json'

import commit from './commands/commit'
import list from './commands/list'
import search from './commands/search'
import config, { list as listConfigs } from './commands/config'
import init from './commands/init'
import remove from './commands/remove'

update({ pkg }).notify()

const cli = cac(pkg.name)

cli.command('list', 'List all the available gitmojis').action(list)
cli.command('search [query]', 'Search gitmojis').action(search)

cli
  .command('config', 'Setup gitmoji-cli preferences')
  .option('-l, --list', 'List config')
  .action(async options => {
    if (options.list) listConfigs()
    else config()
  })

cli.command('commit', 'Interactively commit using the prompts').action(commit)

cli.command('init', 'Initialize gitmoji as a commit hook').action(init)
cli
  .command('remove', 'Remove a previously initialized commit hook')
  .action(remove)

cli.version(pkg.version)
cli.help()

cli.parse()
