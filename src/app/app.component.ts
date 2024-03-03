import { Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import MainHeaderComponent from './components/main-header/main-header.component';
import MainFooterComponent from './components/main-footer/main-footer.component';

// TODO: Replace favicon.ico
// TODO: Scroll behavior (nav)

@Component({
  selector: 'app-root', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterOutlet, MainHeaderComponent, MainFooterComponent],
  template: `
    <div class="flex flex-col relative h-full min-h-screen">
      <app-main-header
        class="absolute top-0 left-0 right-0 z-10"
        [isTransparent]="isHomePage()"
      />

      <main class="grow h-full">
        <router-outlet></router-outlet>
      </main>

      <div>
        <app-main-footer class="w-full h-full" />
      </div>
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
