import eslint from '@rollup/plugin-eslint'
import { RollupOptions } from 'rollup'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const bundle = (config: Partial<RollupOptions>): RollupOptions => ({
  ...config,
  input: {
    index: 'src/index.ts',
  },
})

export default [
  bundle({
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      eslint({
        include: 'src/**',
      }),
      del({ targets: 'dist/*' }),
      esbuild(),
    ],
  }),
  bundle({
    output: {
      dir: 'dist',
      entryFileNames: '[name].d.ts',
      format: 'es',
    },
    plugins: [dts()],
  }),
]