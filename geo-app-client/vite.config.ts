import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': new URL('./src/app', import.meta.url).pathname,
      '@shared': new URL('./src/shared/index', import.meta.url).pathname,
      '@widgets': new URL('./src/widgets', import.meta.url).pathname,
      '@features': new URL('./src/features', import.meta.url).pathname,
      '@entities': new URL('./src/entities', import.meta.url).pathname,
      '@pages': new URL('./src/pages', import.meta.url).pathname,
    }
  }
})
