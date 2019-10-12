import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import shebang from 'rollup-plugin-add-shebang'

export default {
  input: './src/cli.ts',
  output: {
    file: './lib/cli.js',
    format: 'cjs'
  },
  plugins: [
    typescript({ rollupCommonJSResolveHack: true }),
    json(),
    terser(),
    shebang()
  ]
}
