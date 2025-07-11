import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css'
})

export class ProductCategoryMenu implements OnInit {

  productCategories: ProductCategory[] = [];
  
  constructor(private productService: ProductService) {


  }

  ngOnInit(): void {
    this.listProductCategories();
  }
  
  listProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: data => {
        this.productCategories = data;
      },
      error: error => {
        console.error('Error fetching product categories', error);
      }
    });
  }

}
