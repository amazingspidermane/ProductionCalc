import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'node:child_process';

/**
 * The commit this bundle was built from.
 *
 * Stamped into the footer so "which build is this device on?" is answerable by
 * looking at the screen, rather than by comparing bundle hashes against the
 * server. That question comes up every time a deploy has to be confirmed, and
 * on a phone there is no other way to ask it.
 */
function git(command, fallback) {
  try {
    return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().trim() || fallback;
  } catch (e) {
    // No git in the environment, or a build from a tarball.
    return fallback;
  }
}

/**
 * Both values come from the commit, not from the clock.
 *
 * Using the build time instead would give every rebuild a different bundle
 * hash, so re-running a deploy on an unchanged commit would prompt every device
 * on the floor to reload for an identical app. The commit date is also the more
 * useful of the two to read: it says how old the *code* is.
 */
const BUILD_ID = git('git rev-parse --short HEAD', 'local');
const BUILD_TIME = git('git log -1 --format=%cI', new Date().toISOString());

export default defineConfig({
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
  },
  plugins: [
    VitePWA({
      // 'prompt', not 'autoUpdate'. autoUpdate only swaps the bundle on the next
      // full load, so a phone left open through a shift keeps running old code
      // with nothing on screen to say so. src/pwa-update.js checks for new
      // builds and asks; the operator picks the moment to reload.
      registerType: 'prompt',
      // Registration happens in app code via `virtual:pwa-register` so it can
      // own the update checks — no injected registerSW.js to double-register.
      injectRegister: null,
      includeAssets: ['icon.svg', 'icon-512.png'],
      manifest: {
        name: 'ProductionCalc — Production Calculator',
        short_name: 'ProdCalc',
        description: 'Independent production calculator for syrup, materials, and QA date codes. Not affiliated with any beverage manufacturer.',
        theme_color: '#ba0f2c',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon.svg',
            sizes: '150x150',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache all static assets
        // woff2 only — the .ttf is a legacy fallback no target browser needs,
        // and precaching it would add ~426 KB to every install.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        globIgnores: ['**/*.ttf'],
        // Cache Google Fonts at runtime
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ]
});
