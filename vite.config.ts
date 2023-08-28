/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { configDefaults } from 'vitest/dist/config.js'

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    exclude: [...configDefaults.exclude, 'src/e2e/*'],
  },
  define: {
    global: 'window',
  },
})
