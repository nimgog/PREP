/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import * as path from 'path';
import * as fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  ssr: {
    noExternal: ['@apollo/client/**'],
  },
  plugins: [
    analog({
      ssr: true,
      static: true,
      prerender: {
        routes: async () => {
          const contentFilePaths = await fs.readdir('./src/content', {
            recursive: true,
          });

          const contentFileRoutes = contentFilePaths
            .filter((filePath) => !filePath.endsWith('index.md'))
            .map((filePath) => '/blog/' + filePath.replace('.md', ''));

          return [
            '/',
            '/survival-kit',
            '/about-us',
            '/blog',
            ...contentFileRoutes,
          ];
        },
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
