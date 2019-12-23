#!/usr/bin/env node

import cac from 'cac'
import updateNotifier from 'update-notifier'
import cosmiconfig from 'cosmiconfig'
import parser from 'cz-gitmoji-config-parser'

import package_ from '../package.json'

import commands from './commands'

updateNotifier({ pkg: package_ }).notify()

const cli = cac('cz-gitmoji')

async function getConfig() {
  const result = await cosmiconfig('gitmoji2', { cache: false }).search()
  return parser(result?.config ?? {})
}

cli.command('list', 'List all the available gitmojis').action(async () => {
  await commands.list(await getConfig())
})

cli.command('init', 'Initialize gitmoji as a commit hook').action(async () => {
  await commands.init()
})

cli
  .command('remove', 'Remove a previously initialized commit hook')
  .action(async () => {
    await commands.remove()
  })

cli
  .command('commit', 'Interactively commit using the prompts')
  .option('--hook', 'DO NOT USE')
  .action(async ({ hook }) => {
    await commands.commit(await getConfig(), hook ?? false)
  })

cli.version(package_.version)
cli.help()
cli.parse()
