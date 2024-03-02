import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer-payment-methods', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <ul class="flex justify-between sm:justify-center sm:gap-x-2">
      @for (paymentMethod of paymentMethods; track paymentMethod) {
      <li>
        <img
          class="w-8 sm:w-[38px] h-5 sm:h-6"
          [src]="'/img/main-footer/payment/' + paymentMethod + '.svg'"
          [alt]="paymentMethod"
        />
      </li>
      }
    </ul>
  `,
})
export default class MainFooterPaymentMethodsComponent {
  paymentMethods = [
    'amex',
    'apple-pay',
    'google-pay',
    'klarna',
    'maestro',
    'mastercard',
    'shop-pay',
    'unionpay',
    'visa',
  ];
}
