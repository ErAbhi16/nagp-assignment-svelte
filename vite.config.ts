import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'nagp-folderwc-app'
    }
  },
  plugins: [svelte({
    compilerOptions: {
      customElement: true,
      css: 'injected'
    } ,preprocess: require('svelte-preprocess')({
      // Add the necessary SASS options here
      scss: {
        prependData: `@import './src/styles/variables.scss';`,
      },
    }),
  })],
})
