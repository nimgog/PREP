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
      class="flex justify-center items-center w-full h-[70px] lg:h-[80px] px-4"
      [ngClass]="isTransparent() ? 'bg-transparent' : 'bg-prep-green'"
    >
      <div
        class="flex justify-between items-center w-full max-w-centered-content h-full"
      >
        <div class="flex justify-center items-center w-8 lg:hidden">
          <button
            class="w-6 h-6"
            aria-label="Open side menu"
            (click)="toggleMenu()"
          >
            <img src="/img/main-header/side-menu.svg" alt="Side menu" />
          </button>
        </div>
        <div
          [class.hidden]="!menuOpen"
          class="landscape:hidden absolute top-0 left-0 h-svh w-svw z-50 bg-green-900"
        >
          <div class="flex flex-col w-full h-full p-2">
            <div class="flex flex-row w-full justify-between">
              <div class="w-[10px]"></div>
              <a routerLink="/">
                <!-- <div
            class="w-[133px] lg:w-[112px] h-10 lg:h-[52px] bg-prep-beige"
            [ngClass]="isTransparent() ? 'lg:bg-prep-green' : 'lg:bg-[#A3B18A]'"
          ></div> -->
                <img
                  class="w-[100px]"
                  src="/img/main-header/PREP_logo.png"
                  alt=""
                />
              </a>
              <div class="w-[20px]" (click)="toggleMenu()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </div>
            </div>
            <nav class="lg:block">
              <ul
                class="flex flex-col justify-center gap-x-16 text-prep-beige text-base font-medium uppercase"
              >
                <li><a routerLink="/">Home</a></li>
                <li><a routerLink="/survival-kit">Survival Kit</a></li>
                <li><a routerLink="/about-us">About Us</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- TODO: Revisit logo -->
        <a routerLink="/">
          <!-- <div
            class="w-[133px] lg:w-[112px] h-10 lg:h-[52px] bg-prep-beige"
            [ngClass]="isTransparent() ? 'lg:bg-prep-green' : 'lg:bg-[#A3B18A]'"
          ></div> -->
          <img class="w-[100px]" src="/img/main-header/PREP_logo.png" alt="" />
        </a>

        <nav class="hidden lg:block">
          <ul
            class="flex justify-center gap-x-16 text-prep-beige text-base font-medium uppercase"
          >
            <li><a (click)="toggleMenu()" routerLink="/">Home</a></li>
            <li>
              <a (click)="toggleMenu()" routerLink="/survival-kit"
                >Survival Kit</a
              >
            </li>
            <li>
              <a (click)="toggleMenu()" routerLink="/about-us">About Us</a>
            </li>
          </ul>
        </nav>

        <div class="lg:flex justify-end items-center lg:w-[112px]">
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
  menuOpen: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
