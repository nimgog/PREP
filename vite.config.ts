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
    {
      name: 'delete-worker',
      closeBundle: async () => {
        const rootDir = path.resolve(__dirname);
        await deleteWorker(rootDir);
      },
    },
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

async function deleteWorker(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await deleteWorker(fullPath);
    } else if (entry.isFile() && entry.name === '_worker.js') {
      await fs.unlink(fullPath);
    }
  }
}
