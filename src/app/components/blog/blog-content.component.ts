import { MarkdownComponent } from '@analogjs/content';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { decode } from 'html-entities';
import {
  BlogContentImage,
  BlogContentOptimonkEmbedd,
  BlogContentPart,
  BlogContentProduct,
} from 'src/app/models/blog.model';
import BlogImageComponent from './blog-image.component';
import BlogProductCardComponent from './blog-product-card.component';
import BlogOptimonkPrepperChecklistComponent from './blog-optimonk-embedd-prepper-checklist.component';
import BlogInterlinkingComponent from './blog-interlinking.component';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [
    MarkdownComponent,
    NgOptimizedImage,
    BlogImageComponent,
    BlogProductCardComponent,
    BlogOptimonkPrepperChecklistComponent,
    BlogInterlinkingComponent,
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
      }@else if (contentPart.type === 'article') {
      <app-blog-interlinking></app-blog-interlinking>
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
      /\[IMAGE\]\{.*?\}|\[PRODUCT\]\{.*?\}|\[EMBED\]\{.*?\}|\[ARTICLE\]\{.*?\}/gi;
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
          const image = this.parsePlaceholder<BlogContentImage>(
            placeholder,
            '[IMAGE]'
          );

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
          const product = this.parsePlaceholder<BlogContentProduct>(
            placeholder,
            '[PRODUCT]'
          );

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
          const embed = this.parsePlaceholder<BlogContentOptimonkEmbedd>(
            placeholder,
            '[EMBED]'
          );

          parts.push({
            type: 'embed',
            id: embed.id,
          });
        } else if (placeholder.startsWith('[ARTICLE]')) {
          parts.push({
            type: 'article',
            text: '',
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

  parsePlaceholder<T>(placeholder: string, prefix: string): T {
    const withoutPrefix = placeholder.replace(prefix, '');
    const decoded = decode(withoutPrefix);
    const cleaned = decoded.replace(/<a[\s\S]*?>([\s\S]*?)<\/a>/g, '$1');
    const json = JSON.parse(cleaned);

    return json as T;
  }
}
