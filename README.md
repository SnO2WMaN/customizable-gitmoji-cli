<h1 align="center">customizable-gitmoji-cli</h1>

<p align="center">
<a href="https://www.npmjs.com/package/customizable-gitmoji-cli"><img src="https://img.shields.io/npm/v/customizable-gitmoji-cli?style=for-the-badge&logo=npm" alt="npm version"/></a>

<div align="center">
<p>
<!-- prettier-ignore-start -->

[![CircleCI](https://circleci.com/gh/SnO2WMaN/customizable-gitmoji-cli.svg?style=svg)](https://circleci.com/gh/SnO2WMaN/customizable-gitmoji-cli)
[![codecov](https://codecov.io/gh/SnO2WMaN/customizable-gitmoji-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/SnO2WMaN/customizable-gitmoji-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/2cff863272e7a47dd100/maintainability)](https://codeclimate.com/github/SnO2WMaN/customizable-gitmoji-cli/maintainability)

[![LICENSE](https://img.shields.io/github/license/conten2/eslint-config?style=flat-square)](https://www.npmjs.com/package/@conten2/eslint-config)
[![Renovate](https://img.shields.io/badge/renovate-enabled-25c4c3.svg?style=flat-square)](https://renovatebot.com/)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</p>
</div>

## Install 📥

```bash
npm i -g customizable-gitmoji-cli

yarn global add customizable-gitmoji-cli
```

## Usage 🧰

```bash
gitmoji init
```

### help

```
gitmoji --help

Usage:
  $ customizable-gitmoji-cli <command> [options]

Commands:
  list            List all the available gitmojis
  search [query]  Search gitmojis
  config          Setup gitmoji-cli preferences
  commit          Interactively commit using the prompts
  init            Initialize gitmoji as a commit hook
  remove          Remove a previously initialized commit hook

Options:
  -v, --version  Display version number
  -h, --help     Display this message
```

## Commands ⌨️

### init

### remove

### config

### list

### search

### commit

## .gitmojirc ⚙️

Customize by [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) config file!

Like this.

```json
{
  "presets": ["base"],
  "rules": [
    {
      "emoji": "💵",
      "entity": "&#128181;",
      "code": ":dollar:",
      "description": "Adding financial things",
      "name": "dollar"
    }
  ],
  "order": ["dollar"]
}
```

### presets

Currently exists

- [base](https://www.npmjs.com/package/gitmoji-preset-base)

### rules

[Reference](https://github.com/carloscuesta/gitmoji/blob/master/src/data/gitmojis.json)

```json
{
  "emoji": "🎨",
  "code": ":art:",
  "description": "Improving structure / format of the code.",
  "name": "art",
  "entity": "&#x1f3a8;"
}
```

### order

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://sno2wman.dev/"><img src="https://avatars3.githubusercontent.com/u/15155608?v=4" width="100px;" alt="SnO₂WMaN"/><br /><sub><b>SnO₂WMaN</b></sub></a><br /><a href="https://github.com/SnO2WMaN/customizable-gitmoji-cli/commits?author=SnO2WMaN" title="Code">💻</a> <a href="#maintenance-SnO2WMaN" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://renovatebot.com"><img src="https://avatars0.githubusercontent.com/u/25180681?v=4" width="100px;" alt="Renovate Bot"/><br /><sub><b>Renovate Bot</b></sub></a><br /><a href="#infra-renovate-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://carloscuesta.me"><img src="https://avatars1.githubusercontent.com/u/7629661?v=4" width="100px;" alt="Carlos Cuesta"/><br /><sub><b>Carlos Cuesta</b></sub></a><br /><a href="#ideas-carloscuesta" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
