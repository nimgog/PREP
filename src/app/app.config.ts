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
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';

//
export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo,
  ],
};

function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: ApolloLink.from([
      httpLink.create({
        uri: environment.storefrontEndpoint,
        headers: new HttpHeaders().set(
          'X-Shopify-Storefront-Access-Token',
          environment.storefrontAccessToken
        ),
      }),
    ]),
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
