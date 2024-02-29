import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MainHeaderComponent from './components/main-header.component';

@Component({
  selector: 'app-root', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterOutlet, MainHeaderComponent],
  template: `
    <div class="w-dvw h-dvh">
      <app-main-header />

      <main class="flex justify-center items-center">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
