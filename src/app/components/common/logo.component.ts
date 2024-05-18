import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <a routerLink="/">
      <img
        class="w-[100px]"
        ngSrc="/img/main-header/PREP_logo.png"
        alt="PREP logo"
        width="100"
        height="93"
        priority
      />
    </a>
  `,
})
export default class LogoComponent {}
