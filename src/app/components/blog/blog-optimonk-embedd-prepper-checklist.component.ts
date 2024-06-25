import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-optimonk-prepper-checklist',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <div class="om-embedded-campaign" data-campaign-id="3">
      &gt;&gt;HERE I AM&lt;&lt;
    </div>
  `,
})
export default class BlogOptimonkPrepperChecklistComponent {}