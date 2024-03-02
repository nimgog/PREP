import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer-company-info', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `<p
    class="text-prep-beige text-sm font-medium font-roboto uppercase leading-tight"
  >
    Shadida Trading Company AB<br />559356-9345<br />Kristianstadsgatan 10,<br />21423
    Malmö, sweden.
  </p>`,
})
export default class MainFooterCompanyInfoComponent {}
