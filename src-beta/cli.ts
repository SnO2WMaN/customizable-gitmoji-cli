import cac from 'cac'

import chalk from 'chalk'
import consola from 'consola'

import packageJson from '../package.json'

import commit from './commands/commit'
import list from './commands/list'
import search from './commands/search'
import config from './commands/config'

const cli = cac(packageJson.name)

cli.command('list', 'List all the available gitmojis').action(list)
cli.command('search [query]', 'Search gitmojis').action(search)

cli.command('config', 'Setup gitmoji-cli preferences').action(config)

cli.command('commit', 'Interactively commit using the prompts').action(commit)

/*
cli.command('init', 'Initialize gitmoji as a commit hook').action(list)
cli
  .command('remove', 'Remove a previously initialized commit hook')
  .action(list)
*/

cli.version(packageJson.version)
cli.help()

cli.parse()
