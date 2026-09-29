import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/roamly-frontend/' : '/',
  plugins: [react()],
  server: {
    allowedHosts: [
      "specified-blades-penalties-brain.trycloudflare.com"
    ]
  }
}))
