import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import polyfills from 'rollup-plugin-polyfill-node';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

export default {
  input: {
    background: 'src/background/index.ts',
    content: 'src/content/index.ts',
    sidebar: 'src/sidebar/index.tsx'
  },
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.ts', '.tsx']
    }),
    commonjs(),
    polyfills(),
    typescript({
      jsx: 'react-jsx'
    }),
    postcss({
      extract: true,
      minimize: true,
      use: ['sass']
    }),
    copy({
      targets: [
        { src: 'public/manifest.json', dest: 'dist' },
        { src: 'public/*.html', dest: 'dist' },
        { src: 'public/assets/**/*', dest: 'dist/assets' }
      ]
    })
  ]
};
