/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      static: true,
      prerender: {
        routes: async () => ['/', '/survival-kit', '/about-us'],
        postRenderingHooks: [
          async (route) => {
            const startMarker = '<!-- __prerender_exclude_begin -->';
            const endMarker = '<!-- __prerender_exclude_end -->';

            const regex = new RegExp(
              `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(
                endMarker
              )}`,
              'g'
            );

            route.contents = route.contents?.replace(regex, '');

            function escapeRegExp(regExp: string) {
              return regExp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
            }
          },
        ],
      },

      vite: {
        inlineStylesExtension: 'scss',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
