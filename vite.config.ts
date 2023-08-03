// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/HKW-dev-exercise',
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
