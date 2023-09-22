import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      algorithm: 'brotliCompress',
      disable: false,
      ext: '.br',
      filter: /\.(js|css|json|txt|html|ico|svg|md|ttf)$/
    })
  ],
  server: {
    host: 'localhost',
    port: 3000
  },
  preview: {
    host: 'localhost',
    port: 3001
  },
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
