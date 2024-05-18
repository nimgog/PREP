// In your modal component TypeScript file
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="showModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div class="bg-white p-4">
        <video controls class="w-full h-auto max-h-[80svh]">
          <source [src]="videoSource" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button (click)="closeModal()">Close</button>
      </div>
    </div>
  `,
})
export class VideoModalComponent {
  @Input() videoSource: string = '';
  showModal: boolean = false;

  closeModal(): void {
    this.showModal = false;
  }
}
