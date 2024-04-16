import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'Survival sheet | PREP',
};

// TODO: HTML semantics
@Component({
  selector: 'app-survival-cheat-sheet-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="flex justify-center w-full min-h-screen bg-gray-50 pt-[100px] px-4 pb-12"
    >
      <div class="w-full max-w-[800px]">
        <!-- Image -->
        <img
          src="img/shared/survival.jpg"
          alt="Survival Guide"
          class="w-full h-auto rounded-lg shadow-md"
        />

        <!-- Title -->
        <h1 class="text-3xl font-bold mt-6 mb-2">Survival Cheat Sheet</h1>

        <!-- Download Button -->
        <a
          href="/files/Survival-Cheat-Sheet.pdf"
          download
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4 inline-block text-center"
        >
          Download Cheat Sheet
        </a>

        <!-- Attribution -->
        <div class="text-sm text-gray-500 mb-6">
          Full credit goes to TheUrbanPrepper
          <a
            href="https://www.youtube.com/watch?v=FEAz-XC9bY0"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Check out his video</a
          >
          explanation of the cheat sheet
        </div>

        <!-- Blog-style Content -->
        <div class="text-md text-gray-800 mb-6">
          <p class="mb-4">
            This survival cheat sheet is a culmination of community input and
            expertise, crafted from the most helpful comments and suggestions
            from survival enthusiasts. Each section has been meticulously
            organized by survival categories including food, water, shelter, and
            first aid, and more.
          </p>

          <!-- Sections with Headings -->
          <h2 class="text-2xl font-semibold mt-4 mb-2">Key Features:</h2>
          <ul class="list-disc pl-5 mb-4">
            <li>
              Extensive information on urban and rural survival techniques.
            </li>
            <li>Color-coordinated topics for quick reference.</li>
            <li>
              Special sections on navigation, communication, and emergency
              procedures.
            </li>
          </ul>

          <h2 class="text-2xl font-semibold mt-4 mb-2">Universal Usability:</h2>
          <p class="mb-4">
            Designed to be universally useful, this document contains essential
            survival strategies that are applicable whether you're in the UK,
            the US, Brazil, or elsewhere.
          </p>

          <h2 class="text-2xl font-semibold mt-4 mb-2">
            Expert Collaboration:
          </h2>
          <p class="mb-4">
            The cheat sheet was assembled with the aid of a professional graphic
            designer to ensure clarity and usability, incorporating high-quality
            visuals and sourced content from reputable sources like the CDC and
            the Red Cross.
          </p>

          <h2 class="text-2xl font-semibold mt-4 mb-2">
            Inspiration and Motivation:
          </h2>
          <p>
            Includes a selection of inspirational quotes for motivation and
            morale, vital in challenging situations.
          </p>
        </div>

        <!-- Redirect Button -->
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          routerLink="/survival-kit"
        >
          Get Your Prepping Kit
        </button>
      </div>
    </div>
  `,
})
export default class SurvivalCheatSheetComponent {
  downloadFile() {
    // Logic to handle the file download
    window.location.href = '/files/Survival-Cheat-Sheet.pdf';
  }
}
