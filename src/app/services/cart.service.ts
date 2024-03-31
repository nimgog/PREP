import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  image: string;
  title: string;
  variation: string;
  quantity: number;
  price: string;
  currency:string;
  compareAtPrice?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private initialCartItems: CartItem[] = [
   {
      id: 1,
      image: '/img/product1.jpg',
      title: 'The Coco Case iPhone 14',
      variation: 'Sunset Orange',
      quantity: 1,
      price: '799',
      currency: 'SEK',
      compareAtPrice: '999',
    },
  ];

  private cartSubject = new BehaviorSubject<CartItem[]>(this.initialCartItems);
  public cartItems$ = this.cartSubject.asObservable();

  constructor() { }

  addToCart(item: CartItem) {
    const currentItems = this.cartSubject.value;
    const itemIndex = currentItems.findIndex(i => i.id === item.id);

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.cartSubject.next(currentItems);
  }

  removeFromCart(id: number) {
    const currentItems = this.cartSubject.value.filter(item => item.id !== id);
    this.cartSubject.next(currentItems);
  }

  updateItemQuantity(id: number, quantity: number) {
    const currentItems = this.cartSubject.value;
    const itemIndex = currentItems.findIndex(i => i.id === id);

    if (itemIndex !== -1 && quantity > 0) {
      currentItems[itemIndex].quantity = quantity;
    }

    this.cartSubject.next(currentItems);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  // ... Other methods you might need for the cart
}
