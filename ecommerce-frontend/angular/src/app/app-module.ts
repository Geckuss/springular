import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { ProductService } from './services/product-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Routes, RouterModule, ROUTES } from '@angular/router';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { SearchBar } from './components/search-bar/search-bar';
import { ProductDetails } from './components/product-details/product-details';


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
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    ProductService,
  ],
  bootstrap: [App]
})
export class AppModule { }
