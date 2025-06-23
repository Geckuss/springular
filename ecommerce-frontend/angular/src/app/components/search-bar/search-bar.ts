import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  constructor(private router: Router) { }

  doSearch(keyword: string): void {
    if (keyword) {
      this.router.navigateByUrl(`/search/${keyword}`);
    } else {
      this.router.navigateByUrl('/products');
    }
  }
}
