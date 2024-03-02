import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import MainHeaderComponent from './components/main-header/main-header.component';
import MainFooterComponent from './components/main-footer/main-footer.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterOutlet, MainHeaderComponent, MainFooterComponent, NgClass],
  template: `
    <div class="relative w-screen h-full">
      <app-main-header
        class="absolute top-0 left-0 right-0"
        [ngClass]="isHomePage() ? 'bg-transparent' : 'bg-green-900'"
      />

      <main class="w-full h-full min-h-screen">
        <router-outlet></router-outlet>
      </main>

      <app-main-footer
        class="absolute bottom-0 left-0 right-0"
        [ngClass]="isHomePage() ? 'bg-transparent' : 'bg-green-900'"
      />
    </div>
  `,
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);

  readonly isHomePage = signal(true);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage.set(event.url === '' || event.url === '/');
      }
    });
  }
}
