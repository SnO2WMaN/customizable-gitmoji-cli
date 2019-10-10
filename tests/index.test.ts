import consola from 'consola'

import { getConfig, setConfig, ConfigKeys } from '~/config'
import { parseLine } from '~/parseLines'

import { list } from '~/commands/list'
import { search } from '~/commands/search'

consola.mockTypes(() => jest.fn)

describe('config module', () => {
  it('should match for AUTO ADD', () => {
    setConfig(ConfigKeys.AUTO_ADD, true)
    expect(getConfig(ConfigKeys.AUTO_ADD)).toMatchSnapshot()
  })

  it('should match for EMOJI FORMAT', () => {
    setConfig(ConfigKeys.EMOJI_FORMAT, 'emoji')
    expect(getConfig(ConfigKeys.EMOJI_FORMAT)).toMatchSnapshot()
  })

  it('should match for SIGNED COMMIT', () => {
    setConfig(ConfigKeys.SIGNED_COMMIT, false)
    expect(getConfig(ConfigKeys.SIGNED_COMMIT)).toMatchSnapshot()
  })

  it('should match for TITLE MAX LENGTH', () => {
    setConfig(ConfigKeys.TITLE_MAX_LENGTH, 48)
    expect(getConfig(ConfigKeys.TITLE_MAX_LENGTH)).toMatchSnapshot()
  })
})

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
