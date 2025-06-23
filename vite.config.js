import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiUrl } from './config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/amurtest/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
