import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { vitePluginDoctools } from '../packages/plugins'

export default defineConfig({
  root: '',
  rollupOptions: {
    input: {
      index: resolve(__dirname, 'src/sindex.html'),
      about: resolve(__dirname, 'src/about.html'),
    },
  },
  plugins: [vitePluginDoctools(), react()],
  resolve: {
    alias: {
      '@quarbon': resolve(__dirname, '../packages/quarbon/src'),
      '@docs': resolve(__dirname, '../packages/doctools'),
    },
  },
})
