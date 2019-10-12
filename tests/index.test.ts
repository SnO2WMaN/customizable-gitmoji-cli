import consola from 'consola'

import { getConfig, ConfigKeys } from '~/config'
import { parseLine } from '~/parseLines'
import { getFromConfig } from '~/getGitmojis'

import { list } from '~/commands/list'
import { search } from '~/commands/search'

consola.mockTypes(() => jest.fn)

const gitmojis = [
  {
    emoji: '🎨',
    entity: '&#x1f3a8;',
    code: ':art:',
    description: 'Improving structure / format of the code.',
    name: 'art'
  },
  {
    emoji: '🔥',
    entity: '&#x1f525;',
    code: ':fire:',
    description: 'Removing code or files.',
    name: 'fire'
  },
  {
    emoji: '💵',
    entity: '&#128181;',
    code: ':dollar:',
    description: 'Adding financial things',
    name: 'dollar'
  },
  {
    emoji: '✨',
    entity: '&#x2728;',
    code: ':sparkles:',
    description: 'Introducing new features.',
    name: 'sparkles'
  }
]

describe('commands', () => {
  const log = jest.spyOn(console, 'log')
  log.mockImplementation(x => x)

  describe('list', () => {
    it('should match for list', () => {
      list(gitmojis)
      expect(console.log).toHaveBeenCalledTimes(gitmojis.length)
      for (let i = 0; i < gitmojis.length; i += 1)
        expect(log.mock.calls[i][0]).toMatchSnapshot()
      log.mockReset()
      log.mockRestore()
    })
  })

  describe('search', () => {
    it('should false for no query', () => {
      expect(search(gitmojis)).toEqual(false)
    })
    it('should match for correct query', () => {
      search(gitmojis, 'Removing')
      expect(log.mock.calls[0]).toMatchSnapshot()
      log.mockReset()
      log.mockRestore()
    })
  })
})

describe('parse line', () => {
  it('should match for parseLine', () => {
    expect(parseLine(gitmojis[0], 3)).toMatchSnapshot()
  })
})

describe('get gitmojis', () => {
  it('should match for defaults', () => {
    expect(getFromConfig(gitmojis)).toMatchSnapshot()
  })
  describe('have config', () => {
    it('should have rules', () => {
      expect(getFromConfig([], { rules: gitmojis })).toMatchSnapshot()
    })
    it('should have ordered rules', () => {
      expect(
        getFromConfig([], { rules: gitmojis, order: ['sparkles'] })
      ).toMatchSnapshot()
    })
  })
})
