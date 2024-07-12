import slugify from 'slugify';

export const initSlugify = () => {
  slugify.extend({ '(': '', ')': '' });
};
