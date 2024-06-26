import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer-payment-methods',
  standalone: true,
  template: `
    <ul class="flex justify-center gap-x-2">
      @for (paymentMethod of paymentMethods; track paymentMethod) {
      <li>
        <img
          class="w-8 lg:w-[38px] h-5 lg:h-6"
          [src]="'/img/main-footer/payment/' + paymentMethod + '.svg'"
          [alt]="paymentMethod"
          loading="lazy"
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
