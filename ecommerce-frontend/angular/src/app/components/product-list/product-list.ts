import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-table.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.productService.getProductList().subscribe({
      next: data => {
        this.products = data;
      },
      error: error => {
        console.error('Error fetching product list', error);
      }
    });
  }
}
