/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import * as path from 'path';
import * as fs from 'fs/promises';

import { environment } from './src/environments/environment';

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

          const publishedCheckPromises = contentFilePaths
            .filter((filePath) => filePath.endsWith('.md'))
            .map(async (filePath) => {
              const fullPath = path.join('./src/content', filePath);
              const isPublished = await isFilePublished(fullPath);
              return { filePath, isPublished };
            });

          const publishedCheckResults = await Promise.all(
            publishedCheckPromises
          );

          const contentFileRoutes = publishedCheckResults
            .filter(({ isPublished }) => isPublished)
            .map(
              ({ filePath }) =>
                '/blog/' + filePath.replace('/index.md', '').replace('.md', '')
            );

          return [
            '/',
            '/survival-kit',
            '/about-us',
            '/blog',
            ...contentFileRoutes,
          ];
        },
        sitemap: {
          host: environment.cloudflareZone,
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

async function isFilePublished(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  const metaStart = content.indexOf('---');

  if (metaStart < 0) {
    return false;
  }

  const metaEnd = content.indexOf('---', metaStart + 1);

  if (metaEnd < 0) {
    return false;
  }

  const meta = content.substring(metaStart + 1, metaEnd);
  const metaLines = meta.split('\n');

  return metaLines.some(
    (line) => line.trim().toLowerCase() === 'published: true'
  );
}
