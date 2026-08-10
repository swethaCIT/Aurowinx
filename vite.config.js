import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // three.js is only used by the 3D chip scene inside CTASection,
            // which is itself lazy-loaded — keep it out of the much more
            // widely-used framer-motion chunk so pages that never render
            // that scene don't pay for it.
            if (id.includes('three')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            return 'vendor-other';
          }
        }
      }
    }
  }
})