import { UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
// @ts-ignore
import { name } from "./package.json"
import { vitePluginDirectives } from '../plugins'

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      vitePluginDirectives([
        ["// #IFDOC", "// #ENDIF"]
      ]),
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    resolve: {
      alias: {
        "@quarbon": path.resolve(__dirname, "/src"),
      },
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name,
        formats: ['es', 'cjs'],
        fileName: (ext) => `${name}.${ext}.js`,
      },
      rollupOptions: {
        external: [
          'highcharts',
          'prismjs',
          'react',
          'react-dom',
          'react-icons',
          'react-router-dom',
          'react-transition-group',
        ],
        output: {
          globals: {
            'highcharts': 'Highcharts',
            'prismjs': 'PrismJs',
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-icons': 'ReactIcons',
            'react-router-dom': 'ReactRouterDom',
            'react-transition-group': 'ReactTransitionGroup',
          },
        },
      },
      target: 'esnext',
      sourcemap: true
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  })
}
// https://vitejs.dev/config/
export default app
