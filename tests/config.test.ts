import { getConfig, setConfig, ConfigKeys } from '~/config'

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
