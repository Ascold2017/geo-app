import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': new URL('./src/app', import.meta.url).pathname,
      '@common':  new URL('./src/app/common', import.meta.url).pathname,
      '@utils':  new URL('./src/utils', import.meta.url).pathname,
      '@api':  new URL('./src/api', import.meta.url).pathname,
    }
  }
})
