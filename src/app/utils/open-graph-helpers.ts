import { getFullPageTitle } from './page-helpers';

export const getCommonMetaTags = (
  title: string,
  description: string,
  type: 'article' | 'website' = 'website',
  pageUrl: string = '',
  imageUrl: string = '',
  locale: string = ''
) => {
  return [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: getFullPageTitle(title),
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:type',
      content: type,
    },
    // TODO: Fill these meta tags
    // {
    //   property: 'og:url',
    //   content: pageUrl, // Canonical URL
    // },
    // {
    //   property: 'og:image',
    //   content: imageUrl, // Thumbnail image URL
    // },
    // {
    //   property: 'og:locale',
    //   content: locale, // I.e. "en_GB"
    // },
  ];
};
