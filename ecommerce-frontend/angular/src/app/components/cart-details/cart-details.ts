import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})
export class CartDetails {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {



  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );

    this.cartService.computeCartTotals();

  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
    this.listCartDetails();
  }

  increaseQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    this.cartService.decrementFromCart(cartItem);
  }

}
