import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { ProductService } from './services/product-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { SearchBar } from './components/search-bar/search-bar';
import { ProductDetails } from './components/product-details/product-details';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    SearchBar,
    ProductDetails,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    ProductService,
  ],
  bootstrap: [App]
})
export class AppModule { }
