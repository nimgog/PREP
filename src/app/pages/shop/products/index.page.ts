import { Component } from '@angular/core';
import ProductListComponent, {
  sharedRouteMeta,
} from 'src/app/components/shop/product-list.component';

export const routeMeta = sharedRouteMeta;

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductListComponent],
  template: `<app-product-list></app-product-list>`,
})
export default class ProductsPageComponent {}
