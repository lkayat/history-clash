import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'game-data': ['./src/data/scenarios.js', './src/data/facts.js'],
          'card-data': ['./src/data/cards/index.js'],
          'svg-sprites': ['./src/data/svgSprites.js'],
        },
      },
    },
  },
})
