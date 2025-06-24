import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})

export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute, 
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts(this.route.snapshot.paramMap.get('keyword')!);
      return;
    }

    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(keyword: string): void {

    this.productService.searchProducts(keyword).subscribe({
      next: data => {
        this.products = data;
      },
      error: error => {
        console.error('Error fetching search results by keyword', error);
      }
    });
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe({
      next: data => {
        this.products = data;
      },
      error: error => {
        console.error('Error fetching product list', error);
      }
    });
  }

}
