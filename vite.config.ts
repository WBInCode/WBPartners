import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Manual chunks to split the bundle
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // React and core dependencies
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-animation';
          }
          // 3D libraries (largest chunk)
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'vendor-three';
          }
          // Icons
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
    // Increase chunk size warning limit (Three.js is inherently large)
    chunkSizeWarningLimit: 600,
  },
})
