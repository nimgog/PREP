import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import LoadingSpinnerComponent from '../common/loading-spinner.component';
import { NgxTurnstileFormsModule, NgxTurnstileModule } from 'ngx-turnstile';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    NgxTurnstileModule,
    NgxTurnstileFormsModule,
  ],
  template: `
    <form
      [formGroup]="contactForm"
      (ngSubmit)="onSubmit()"
      class="flex flex-col gap-y-2 lg:gap-y-[22px] w-full"
    >
      <div class="flex flex-col lg:gap-y-[15px]">
        <label
          for="fullName"
          class="text-gray-700 text-base font-medium leading-normal"
        >
          Full Name<span class="text-red-800">*</span>
        </label>

        <div>
          <input
            formControlName="fullName"
            id="fullName"
            type="text"
            class="form-field w-full min-w-0 h-9 px-1.5 bg-white border border-gray-200 !outline-none"
          />

          <div class="form-field-error-container">
            @if (isInvalidTouched('fullName')) {
            <p class="form-field-error-message">Please enter your full name.</p>
            }
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:gap-y-[15px]">
        <label
          for="emailAddress"
          class="text-gray-700 text-base font-medium leading-normal"
        >
          Email Address<span class="text-red-800">*</span>
        </label>

        <div>
          <input
            formControlName="emailAddress"
            id="emailAddress"
            type="email"
            class="form-field w-full min-w-0 h-9 px-1.5 bg-white border border-gray-200 !outline-none"
          />

          <div class="form-field-error-container">
            @if (isInvalidTouched('emailAddress')) {
            <p class="form-field-error-message">
              Please enter a valid email address.
            </p>
            }
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:gap-y-[15px]">
        <label
          for="message"
          class="text-gray-700 text-base font-medium leading-normal"
        >
          Message<span class="text-red-800">*</span>
        </label>

        <div>
          <textarea
            formControlName="message"
            id="message"
            class="form-field w-full min-w-0 h-[106px] lg:h-[165px] px-1.5 bg-white border border-gray-200 !outline-none"
          ></textarea>

          <div class="form-field-error-container h-10">
            @if (isInvalidTouched('message')) {
            <p class="form-field-error-message">
              Please enter at least {{ messageMinLength }}, at most
              {{ messageMaxLength }} characters.
            </p>
            }
          </div>
        </div>
      </div>

      <div>
        @if (contextService.isClientSide) {
        <ngx-turnstile
          formControlName="turnstileToken"
          [siteKey]="turnstileSiteKey"
          theme="light"
        />
        }
      </div>

      <div
        class="cursor-pointer flex justify-center items-center w-[100px] lg:w-full h-[52px] px-6 py-4 bg-prep-green"
        (click)="onSubmit()"
      >
        <button
          type="submit"
          [disabled]="isSubmitting()"
          [ngClass]="[!isSubmitting() ? '' : 'opacity-50 cursor-not-allowed']"
          class="text-white text-sm lg:text-xl font-semibold"
          aria-label="Submit contact form"
        >
          {{ isSubmitting() ? '' : 'Submit' }}
        </button>

        @if (isSubmitting()) {
        <app-loading-spinner
          color="white"
          bgClass="bg-coco-orange"
          [scale]="0.5"
        ></app-loading-spinner>
        }
      </div>
    </form>
  `,
  styles: [
    `
      .form-field.ng-invalid.ng-touched {
        @apply bg-red-800 bg-opacity-5 border-red-800 border-opacity-50 #{!important};
      }

      .form-field-error-container {
        @apply min-h-5 #{!important};
      }

      .form-field-error-message {
        @apply text-red-800 text-sm font-normal #{!important};
      }
    `,
  ],
})
export default class ContactFormComponent {
  readonly messageMinLength = 80;
  readonly messageMaxLength = 1000;
  readonly turnstileSiteKey = environment.turnstileSiteKey;

  private readonly httpClient = inject(HttpClient);
  private readonly notificationService = inject(NotificationService);
  readonly contextService = inject(ContextService);

  readonly isSubmitting = signal(false);

  contactForm!: FormGroup;

  ngOnInit() {
    this.contactForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      message: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.messageMinLength),
        Validators.maxLength(this.messageMaxLength),
      ]),
      turnstileToken: new FormControl(null, Validators.required),
    });
  }

  isInvalidTouched(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control ? !control.valid && control.touched : false;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.httpClient
      .post(environment.contactWorkerEndpoint, this.contactForm.value, {
        headers: new HttpHeaders().set('Accept', 'application/json'),
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.contactForm.reset();

          this.notificationService.showSuccessMessage({
            title: 'Request sent',
            message: 'We will contact you soon!',
          });
        },
        error: () => {
          this.notificationService.showErrorMessage({
            title: 'Failed to send request',
            message: 'Please try again later.',
          });
        },
      });
  }
}
