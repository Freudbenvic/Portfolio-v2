import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Freud Benvic Bossou - Portfolio',
        short_name: 'Freud Bossou',
        description: 'Portfolio de Freud Benvic Bossou, Développeur Full-Stack (React, Django, Flutter).',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // precache the app itself, not the CV, the social share image or unused files
        globPatterns: ['**/*.{js,css,html,svg,webp,woff2}', 'favicon.png', 'apple-touch-icon.png', 'pwa-*.png'],
        globIgnores: ['**/og-image*', '**/Logo_Portfolio.png', '**/*.pdf'],
        // never let the service worker answer API calls with index.html
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
})
