import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/cli.ts',
  output: {
    file: './lib/cli.js',
    format: 'cjs'
  },
  plugins: [typescript({ rollupCommonJSResolveHack: true }), json(), terser()]
}
