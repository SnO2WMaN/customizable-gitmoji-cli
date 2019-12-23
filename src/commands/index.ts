import list from './list'
import hook from './hook'
import commit from './commit'

export default {
  list,
  init: hook.create,
  remove: hook.remove,
  commit
}
