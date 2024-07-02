/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import * as path from 'path';
import * as fs from 'fs/promises';
import fm from 'front-matter';

import { environment } from './src/environments/environment';
import { PageAttributes } from 'src/app/models/blog.model';

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
          const contentFileRoutes = await getPublishedContentFileRoutes();

          return [
            '/',
            '/survival-kit/',
            '/survival-cheat-sheet/',
            '/about-us/',
            '/blog/',
            ...contentFileRoutes,
            '/not-found/',
          ];
        },
        sitemap: {
          host: environment.cloudflareZone + '/',
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

async function getPublishedContentFileRoutes() {
  const contentFilePaths = await fs.readdir('./src/content', {
    recursive: true,
  });

  const publishedCheckPromises = contentFilePaths
    .filter((filePath) => filePath.endsWith('.md'))
    .map(async (filePath) => {
      const fullPath = path.join('./src/content', filePath);
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      const pageAttributes = fm<PageAttributes>(fileContent).attributes;

      return { filePath, isPublished: pageAttributes.published };
    });

  const publishedCheckResults = await Promise.all(publishedCheckPromises);

  const contentFileRoutes = publishedCheckResults
    .filter(
      ({ filePath, isPublished }) =>
        filePath.includes('emergency-kits') && isPublished
    )
    .map(
      ({ filePath }) =>
        '/blog/' + filePath.replace('/index.md', '').replace('.md', '') + '/'
    );

  return contentFileRoutes;
}
