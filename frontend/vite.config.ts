import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Allows for Docker usage (and hot reloading ultimately, I believe)
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Important for Docker
    port: 5173,
    watch: {
      usePolling: true  // Better for Docker
    }
  },
  css: {
    postcss: './postcss.config.cjs'  // Explicitly point to your PostCSS config
  }
})

