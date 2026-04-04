import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://carelink.p-e.kr',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://carelink.p-e.kr',
        changeOrigin: true,
      },
    },
  },
})
