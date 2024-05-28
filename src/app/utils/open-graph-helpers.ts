import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

export const createCommonMetaResolver =
  (
    title: string,
    description: string,
    imageUrl?: string,
    type: 'article' | 'website' = 'website'
  ) =>
  (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const metaTags: MetaTag[] = [
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:type',
        content: type,
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      // TODO: Fill these meta tags when internationalization is implemented
      // {
      //   property: 'og:locale:alternate',
      //   content: locale, // I.e. "es_ES"
      // },
      // {
      //   property: 'og:locale:alternate',
      //   content: locale, // I.e. "fr_FR"
      // }
      {
        property: 'og:url',
        content:
          environment.cloudflareZone +
          state.url +
          (state.url.endsWith('/') ? '' : '/'),
      },
      {
        property: 'og:site_name',
        content: 'PREP',
      },
    ];

    if (imageUrl) {
      metaTags.push({
        property: 'og:image',
        content: imageUrl.startsWith('/')
          ? environment.cloudflareZone + imageUrl
          : imageUrl,
      });
    }

    return metaTags;
  };
