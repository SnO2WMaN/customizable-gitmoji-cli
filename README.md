<h1 align="center">customizable-gitmoji-cli</h1>

<p align="center">
<a href="https://www.npmjs.com/package/customizable-gitmoji-cli"><img src="https://img.shields.io/npm/v/customizable-gitmoji-cli?style=for-the-badge&logo=npm" alt="npm version"/></a>

<div align="center">
<p>

[![CircleCI](https://circleci.com/gh/gitmoji-org/customizable-gitmoji-cli.svg?style=svg)](https://circleci.com/gh/gitmoji-org/customizable-gitmoji-cli)
[![codecov](https://codecov.io/gh/gitmoji-org/customizable-gitmoji-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/gitmoji-org/customizable-gitmoji-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/50be3bef231058c00dc7/maintainability)](https://codeclimate.com/github/gitmoji-org/customizable-gitmoji-cli/maintainability)

[![LICENSE](https://img.shields.io/github/license/conten2/eslint-config?style=flat-square)](https://www.npmjs.com/package/@conten2/eslint-config)
[![Renovate](https://img.shields.io/badge/renovate-enabled-25c4c3.svg?style=flat-square)](https://renovatebot.com/)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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
