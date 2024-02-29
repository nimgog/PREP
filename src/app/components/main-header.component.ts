import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-header', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <ul class="flex justify-center gap-x-8">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/survival-kit">Survival Kit</a></li>
          <li><a routerLink="/about-us">About Us</a></li>
          <li><a routerLink="/unknown">404 Test</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export default class MainHeaderComponent {}
