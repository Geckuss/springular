import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css'
})
export class CartStatus {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus(this.totalPrice, this.totalQuantity);
  }

  updateCartStatus(totalPrice: number, totalQuantity: number): void {
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
  }

}
