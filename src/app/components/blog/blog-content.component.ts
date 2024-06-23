import { MarkdownComponent } from '@analogjs/content';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  BlogContentImage,
  BlogContentPart,
  BlogContentProduct,
} from 'src/app/models/blog.model';
import BlogImageComponent from './blog-image.component';
import BlogProductCardComponent from './blog-product-card.component';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [
    MarkdownComponent,
    NgOptimizedImage,
    BlogImageComponent,
    BlogProductCardComponent,
  ],
  template: `
    <div>
      @for (contentPart of contentParts(); track contentPart) { @if
      (contentPart.type === 'image') {
      <app-blog-image [data]="contentPart"></app-blog-image>
      } @else if (contentPart.type === 'markdown' && !!contentPart.text) {
      <analog-markdown [content]="contentPart.text"></analog-markdown>
      } @else if (contentPart.type === 'product') {
      <app-blog-product-card [data]="contentPart"></app-blog-product-card>
      } }
    </div>
  `,
})
export default class BlogContentComponent {
  contentText = input.required<string>();

  contentParts = computed<BlogContentPart[]>(() =>
    this.splitContent(this.contentText())
  );

  splitContent(content: string): BlogContentPart[] {
    const imageRegex = /\[IMAGE\]\{.*?\}/gi;
    const imagePlaceholderPrefix = '[IMAGE]';
    const images: BlogContentImage[] = [];

    const productRegex = /\[PRODUCT\]\{.*?\}/gi;
    const productPlaceholderPrefix = '[PRODUCT]';
    const products: BlogContentProduct[] = [];

    const contentWithPlaceholders = content
      .replace(imageRegex, (match) => {
        const placeholder = `${imagePlaceholderPrefix}_${images.length}`;

        const image = JSON.parse(
          match.replace(imagePlaceholderPrefix, '')
        ) as BlogContentImage;

        images.push(image);

        return placeholder;
      })
      .replace(productRegex, (match) => {
        const placeholder = `${productPlaceholderPrefix}_${products.length}`;

        const product = JSON.parse(
          match.replace(productPlaceholderPrefix, '')
        ) as BlogContentProduct;

        products.push(product);

        return placeholder;
      });

    const parts: BlogContentPart[] = [];
    let remainingContent = contentWithPlaceholders;

    images.forEach((image, index) => {
      const placeholder = `${imagePlaceholderPrefix}_${index}`;
      const splitIndex = remainingContent.indexOf(placeholder);

      if (splitIndex > -1) {
        if (splitIndex > 0) {
          parts.push({
            type: 'markdown',
            text: remainingContent.substring(0, splitIndex),
          });
        }

        parts.push({
          type: 'image',
          src: image.src,
          alt: image.alt,
          srcset: image.srcset || '',
          width: image.width,
          height: image.height,
          fill: image.fill || false,
          priority: image.priority || false,
        });

        remainingContent = remainingContent.substring(
          splitIndex + placeholder.length
        );
      }
    });

    products.forEach((product, index) => {
      const placeholder = `${productPlaceholderPrefix}_${index}`;
      const splitIndex = remainingContent.indexOf(placeholder);

      if (splitIndex > -1) {
        if (splitIndex > 0) {
          parts.push({
            type: 'markdown',
            text: remainingContent.substring(0, splitIndex),
          });
        }

        parts.push({
          type: 'product',
          title: product.title,
          description: product.description,
          url: product.url,
          imageUrl: product.imageUrl,
          imageAlt: product.imageAlt,
          imagePriority: product.imagePriority || false,
        });

        remainingContent = remainingContent.substring(
          splitIndex + placeholder.length
        );
      }
    });

    if (remainingContent.length > 0) {
      parts.push({ type: 'markdown', text: remainingContent });
    }

    return parts;
  }
}
