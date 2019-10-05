import cac from 'cac'
import packageJson from '../package.json'

import list from './list'

const cli = cac(packageJson.name)

cli.command('list', 'List all the available gitmojis').action(list)

/*
cli.command('commit', 'Interactively commit using the prompts').action(list)
cli.command('config', 'Setup gitmoji-cli preferences').action(list)
*/

/*
cli.command('init', 'Initialize gitmoji as a commit hook').action(list)
cli
  .command('remove', 'Remove a previously initialized commit hook')
  .action(list)
*/

/*
cli.command('search', 'Search gitmojis').action(list)
*/

cli.version(packageJson.version)
cli.help()

cli.parse()
