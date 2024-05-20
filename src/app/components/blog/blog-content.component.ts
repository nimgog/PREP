import { MarkdownComponent } from '@analogjs/content';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { BlogContentPart } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [MarkdownComponent, NgOptimizedImage],
  template: `
    <div>
      @for (contentPart of contentParts(); track contentPart) { @if
      (contentPart.type === 'image') {
      <div class="flex justify-center pt-8">
        <img
          [ngSrc]="contentPart.src"
          [alt]="contentPart.alt"
          [ngSrcset]="contentPart.srcset"
          [width]="contentPart.width"
          [height]="contentPart.height"
          [fill]="contentPart.fill"
          [priority]="contentPart.priority"
        />
      </div>
      } @else if (contentPart.type === 'markdown' && !!contentPart.text) {
      <analog-markdown [content]="contentPart.text"></analog-markdown>
      } }
    </div>
  `,
})
export default class BlogContentComponent {
  contentText = input.required<string>();

  contentParts = computed<BlogContentPart[]>(() =>
    this.splitContentByImages(this.contentText())
  );

  splitContentByImages(content: string): BlogContentPart[] {
    const imageRegex = /\[IMAGE\]\{.*?\}/gi;
    const images: any[] = [];
    const placeholderPrefix = '[IMAGE]';
    let placeholderCounter = 0;

    const contentWithPlaceholders = content.replace(imageRegex, (match) => {
      const placeholder = `${placeholderPrefix}_${placeholderCounter++}`;
      const image = JSON.parse(match.replace(placeholderPrefix, ''));

      images.push(image);

      return placeholder;
    });

    const parts: BlogContentPart[] = [];
    let remainingContent = contentWithPlaceholders;

    images.forEach((image, index) => {
      const placeholder = `${placeholderPrefix}_${index}`;
      const splitIndex = remainingContent.indexOf(placeholder);

      if (splitIndex > -1) {
        parts.push({
          type: 'markdown',
          text: remainingContent.substring(0, splitIndex),
        });

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

    parts.push({ type: 'markdown', text: remainingContent });

    return parts;
  }
}
