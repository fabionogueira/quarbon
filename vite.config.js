import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { vitePluginDoctools } from './packages/plugins'

export default defineConfig({
  root: './site',
  plugins: [vitePluginDoctools(), react()],
  resolve: {
    alias: {
      '@quarbon': resolve(__dirname, './packages/quarbon/src'),
      '@docs': resolve(__dirname, './packages/doctools'),
    },
  },
})
