import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-optimonk-prepper-checklist',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: ` <div class="om-embedded-campaign" data-campaign-id="3"></div> `,
})
export default class BlogOptimonkPrepperChecklistComponent {}
