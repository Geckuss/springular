import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }

  addToCart(cartItem: CartItem) {

    let existsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;
    
    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

      existsInCart = existingCartItem != undefined;
    }

    if (existsInCart && existingCartItem) {
        existingCartItem.quantity++;
    }
    else {
        this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }
  
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementFromCart(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  removeFromCart(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(item => item.id === cartItem.id);
    
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
  
}
