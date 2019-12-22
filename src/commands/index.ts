import list from './ls'
import hook from './hook'

export default {
  list,
  init: hook.create,
  remove: hook.remove
}
