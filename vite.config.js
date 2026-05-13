import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'auto',
      includeAssets: ['ballistics-icon.png', 'manifest.json', 'robots.txt'],
      injectManifest: {
        swSrc: 'src/service-worker.js',
        swDest: 'dist/sw.js',
        manifest: {
          short_name: 'Ballistics',
          name: 'Ballistics Calculator',
          icons: [
            {
              src: 'ballistics-icon.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
          start_url: '.',
          display: 'standalone',
          theme_color: '#000000',
          background_color: '#ffffff',
        },
      },
    }),
  ],
  base: '/ballistics/',
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/index.jsx',
        'src/setupTests.js',
        'src/service-worker.js',
        'src/config.js',
        'src/data/firearms.js',
        'src/utils/ingals.data.js',
        'src/components/Target.jsx',
        'src/App.jsx',
      ],
    },
  },
});
