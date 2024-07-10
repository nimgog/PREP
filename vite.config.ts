/// <reference types="vitest" />

import analog from '@analogjs/platform';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import * as path from 'path';
import * as fs from 'fs/promises';
import fm from 'front-matter';
import { defineConfig } from 'vite';
import { environment } from './src/environments/environment';
import { PageAttributes } from './src/app/models/blog.model';
import { buildPreppProductUrl } from './src/app/utils/shopify-product-helpers';

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
          const productRoutes = await getProductRoutes();

          const contentRoutes = await getContentRoutes();
          const contentPageCount = Math.ceil(
            contentRoutes.length / environment.blogArticleListPageSize
          );

          return [
            '/',
            '/shop',
            '/shop/products',
            ...productRoutes,
            '/survival-kit',
            '/survival-cheat-sheet',
            '/about-us',
            '/blog',
            ...contentRoutes,
            '/blog/pages',
            ...[...Array(contentPageCount).keys()].map(
              (i) => `/blog/pages/${i + 1}`
            ),
            '/not-found',
          ];
        },
        sitemap: {
          host: environment.cloudflareZone + '/',
        },
      },
      nitro: {
        prerender: {
          autoSubfolderIndex: false,
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

async function getContentRoutes(): Promise<string[]> {
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

  const contentRoutes = publishedCheckResults
    .filter(({ isPublished }) => isPublished)
    .map(
      ({ filePath }) =>
        '/blog/' + filePath.replace('/index.md', '').replace('.md', '')
    );

  return contentRoutes;
}

async function getProductRoutes(): Promise<string[]> {
  const apolloClient = new ApolloClient({
    uri: environment.storefrontEndpoint,
    headers: {
      'X-Shopify-Storefront-Access-Token': environment.storefrontAccessToken,
    },
    cache: new InMemoryCache(),
  });

  const products = await fetchProducts(apolloClient);

  const productRoutes = products.map((product) =>
    buildPreppProductUrl(
      product.variantId,
      product.title,
      product.variantSlugSeoTagOverride
    )
  );

  return productRoutes;
}

type Product = {
  variantId: string;
  title: string;
  variantSlugSeoTagOverride?: string;
};

async function fetchProducts(
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<Product[]> {
  const query = gql`
    query Products($countryCode: CountryCode!)
    @inContext(country: $countryCode) {
      products(first: 250, query: "NOT title:dummy") {
        nodes {
          title
          variants(first: 1) {
            nodes {
              id
              variantSlugSeoTagOverride: metafield(
                namespace: "prepp_app"
                key: "variant_slug_seo_tag_override"
              ) {
                value
              }
            }
          }
        }
      }
    }
  `;

  const response = await apolloClient.query({
    query,
    variables: {
      countryCode: 'DE',
    },
  });

  if (
    !response.data?.products?.nodes?.length ||
    response.error ||
    response.errors?.length
  ) {
    throw new Error(`Shopify request failed: ${JSON.stringify(response)}`);
  }

  const products = response.data.products.nodes.map((product: any) => {
    const variant = product.variants.nodes[0];

    return <Product>{
      variantId: variant.id,
      title: product.title,
      variantSlugSeoTagOverride: variant.variantSlugSeoTagOverride?.value,
    };
  });

  return products;
}
