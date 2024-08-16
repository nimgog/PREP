import {
  HttpHeaders,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions } from '@apollo/client/core/ApolloClient';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';
import { provideToastr } from 'ngx-toastr';
import { withInMemoryScrolling } from '@angular/router';
import { IMAGE_CONFIG, provideCloudflareLoader } from '@angular/common';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { initSlugify } from './slugify.config';

initSlugify();

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideContent(withMarkdownRenderer()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true,
      maxOpened: 3,
    }),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo,
    provideCloudflareLoader(environment.cloudflareZone),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 30,
      },
    },
  ],
};

function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({
      uri: environment.storefrontEndpoint,
      headers: new HttpHeaders().set(
        'X-Shopify-Storefront-Access-Token',
        environment.storefrontAccessToken
      ),
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache', // Remove this and specify caching options on a query level if needed
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  };
}
