import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Your frontend runs on port 3000 (Vite's default or as specified)
    // The proxy forwards /api requests to your backend at 5000
    proxy: {
      '/api': {
        // [MODIFIED] Changed to your backend port
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,      
      }
    }
  }
})

