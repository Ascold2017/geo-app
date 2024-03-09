import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin',
  resolve: {
    alias: {
      '@entities':  new URL('./src/entities', import.meta.url).pathname,
      '@widgets':  new URL('./src/widgets', import.meta.url).pathname,
      '@features':  new URL('./src/features', import.meta.url).pathname,
      '@shared':  new URL('./src/shared/index', import.meta.url).pathname,
    }
  },

})
