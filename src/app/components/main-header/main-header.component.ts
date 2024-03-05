import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-main-header', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink, NgClass, MatIcon, MatToolbar],
  template: `
    <header
      class="flex justify-center items-center w-full h-[70px] sm:h-[80px] px-4"
      [ngClass]="isTransparent() ? 'bg-transparent' : 'bg-prep-green'"
    >
      <div
        class="flex justify-between items-center w-full max-w-centered-content h-full"
      >
        <div class="flex justify-center items-center w-8 sm:hidden">
          <button class="w-6 h-6" aria-label="Open side menu">
            <img src="/img/main-header/side-menu.svg" alt="Side menu" />
          </button>
          <!-- Kept as example -->
          <!-- <button
          class="flex justify-center items-center"
          mat-icon-button
          aria-label="Open side menu"
        >

          <mat-icon class="text-prep-beige" fontSet="material-icons-round"
            >menu</mat-icon
          >
        </button> -->
        </div>

        <!-- TODO: Revisit logo -->
        <a routerLink="/">
          <div
            class="w-[133px] sm:w-[112px] h-10 sm:h-[52px] bg-prep-beige"
            [ngClass]="isTransparent() ? 'sm:bg-prep-green' : 'sm:bg-[#A3B18A]'"
          ></div>
        </a>

        <nav class="hidden sm:block">
          <ul
            class="flex justify-center gap-x-16 text-prep-beige text-base font-medium uppercase"
          >
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/survival-kit">Survival Kit</a></li>
            <li><a routerLink="/about-us">About Us</a></li>
          </ul>
        </nav>

        <div class="sm:flex justify-end items-center sm:w-[112px]">
          <button class="w-8 h-8 p-[3px]" aria-label="Open shopping cart">
            <img src="/img/main-header/shopping-cart.svg" alt="Shopping cart" />
          </button>
        </div>
      </div>
    </header>
  `,
})
export default class MainHeaderComponent {
  isTransparent = input.required<boolean>();
}
