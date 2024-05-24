import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import {
  CornerstonePageAttributes,
  SupportingPageAttributes,
} from 'src/app/models/blog.model';
import { getCommonMetaTags } from 'src/app/utils/open-graph-helpers';
import { getFullPageTitle } from 'src/app/utils/page-helpers';

const injectActivePageAttributes = (
  route: ActivatedRouteSnapshot
): {
  cornerstonePageAttributes: CornerstonePageAttributes;
  supportingPageAttributes?: SupportingPageAttributes;
} | null => {
  const cornerstonePageSlug = route.paramMap.get('cornerstone-slug');

  if (!cornerstonePageSlug) {
    return null;
  }

  const cornerstonePageFiles = injectContentFiles<CornerstonePageAttributes>(
    (contentFile) =>
      contentFile.filename.startsWith(
        `/src/content/${cornerstonePageSlug}/index.md`
      ) && !!contentFile.attributes.published
  );

  if (cornerstonePageFiles.length !== 1) {
    return null;
  }

  const cornerstonePageFile = cornerstonePageFiles[0];
  const supportingPageSlug = route.paramMap.get('supporting-slug');

  if (!supportingPageSlug) {
    return { cornerstonePageAttributes: cornerstonePageFile.attributes };
  }

  const supportingPageFiles = injectContentFiles<SupportingPageAttributes>(
    (contentFile) =>
      contentFile.filename.startsWith(
        `/src/content/${cornerstonePageSlug}/${supportingPageSlug}.md`
      ) && !!contentFile.attributes.published
  );

  if (supportingPageFiles.length !== 1) {
    return null;
  }

  return {
    cornerstonePageAttributes: cornerstonePageFile.attributes,
    supportingPageAttributes: supportingPageFiles[0].attributes,
  };
};

export const titleResolver: ResolveFn<string> = (route) => {
  const pageAttributesPair = injectActivePageAttributes(route);

  if (!pageAttributesPair) {
    return getFullPageTitle('Not Found');
  }

  const pageAttributes = pageAttributesPair.supportingPageAttributes
    ? pageAttributesPair.supportingPageAttributes
    : pageAttributesPair.cornerstonePageAttributes;

  return getFullPageTitle(pageAttributes.title);
};

export const metaResolver: ResolveFn<MetaTag[]> = (route) => {
  const pageAttributesPair = injectActivePageAttributes(route);

  if (!pageAttributesPair) {
    return [];
  }

  const pageAttributes = pageAttributesPair.supportingPageAttributes
    ? pageAttributesPair.supportingPageAttributes
    : pageAttributesPair.cornerstonePageAttributes;

  // TODO: Add more meta tags if needed, i.e. see below... meta robots tag can also be added here
  return [
    ...getCommonMetaTags(
      pageAttributes.title,
      pageAttributes.description,
      'article'
    ),
    {
      name: 'author',
      content: 'Nimer Shadida Johansson',
    },
    {
      property: 'article:published_time',
      content: pageAttributes.date,
    },
    // {
    //   property: 'article:modified_date',
    //   content: pageAttributes.date,
    // },
    {
      property: 'article:author',
      content: 'Nimer Shadida Johansson',
    },
    {
      property: 'article:section', // High-level section name, i.e. Technology
      content: pageAttributesPair.cornerstonePageAttributes.title,
    },
    {
      property: 'article:tag',
      content: pageAttributes.title,
    },
  ];
};
