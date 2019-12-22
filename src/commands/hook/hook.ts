export default {
  permissions: 0o775,
  path: '/hooks/prepare-commit-msg',
  contents:
    '#!/bin/sh\n# gitmoji as a commit hook\nexec < /dev/tty\ngitmoji --hook $1\n'
}
