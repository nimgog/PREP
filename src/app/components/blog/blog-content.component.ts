import { MarkdownComponent } from '@analogjs/content';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  BlogContentImage,
  BlogContentOptimonkEmbedd,
  BlogContentPart,
  BlogContentProduct,
} from 'src/app/models/blog.model';
import BlogImageComponent from './blog-image.component';
import BlogProductCardComponent from './blog-product-card.component';
import BlogOptimonkPrepperChecklistComponent from './blog-optimonk-embedd-prepper-checklist.component';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [
    MarkdownComponent,
    NgOptimizedImage,
    BlogImageComponent,
    BlogProductCardComponent,
    BlogOptimonkPrepperChecklistComponent,
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
      } @else if (contentPart.type === 'embed') {
      <app-blog-optimonk-prepper-checklist
        [data]="contentPart"
      ></app-blog-optimonk-prepper-checklist>
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
    const parts: BlogContentPart[] = [];
    let remainingContent = content;

    const combinedRegex =
      /\[IMAGE\]\{.*?\}|\[PRODUCT\]\{.*?\}|\[EMBED\]\{.*?\}/gi;
    let match;

    while ((match = combinedRegex.exec(content)) !== null) {
      const placeholder = match[0];
      const splitIndex = remainingContent.indexOf(placeholder);

      if (splitIndex > -1) {
        if (splitIndex > 0) {
          parts.push({
            type: 'markdown',
            text: remainingContent.substring(0, splitIndex),
          });
        }

        if (placeholder.startsWith('[IMAGE]')) {
          const image = JSON.parse(
            placeholder.replace('[IMAGE]', '').replaceAll('&quot;', '"')
          ) as BlogContentImage;

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
        } else if (placeholder.startsWith('[PRODUCT]')) {
          const product = JSON.parse(
            placeholder.replace('[PRODUCT]', '').replaceAll('&quot;', '"')
          ) as BlogContentProduct;

          parts.push({
            type: 'product',
            title: product.title,
            description: product.description,
            url: product.url,
            imageUrl: product.imageUrl,
            imageAlt: product.imageAlt,
            imagePriority: product.imagePriority || false,
          });
        } else if (placeholder.startsWith('[EMBED]')) {
          const embed = JSON.parse(
            placeholder.replace('[EMBED]', '').replaceAll('&quot;', '"')
          ) as BlogContentOptimonkEmbedd;

          parts.push({
            type: 'embed',
            id: embed.id,
          });
        }

        remainingContent = remainingContent.substring(
          splitIndex + placeholder.length
        );
      }
    }

    if (remainingContent.length > 0) {
      parts.push({ type: 'markdown', text: remainingContent });
    }

    return parts;
  }
}
