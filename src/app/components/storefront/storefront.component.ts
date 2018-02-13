import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/filter';

// models used in this component
import { Product } from 'app/models/product.model';

// services used in this component
import { ProductsService } from 'app/services/products.service';
import { ShoppingcartService } from 'app/services/shoppingcart.service';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss'],
})
export class StorefrontComponent implements OnInit {
  public products: Observable<Product[]>;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingcartService) {
    console.log('StorefrontComponent loaded');
   }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
        .get()
        .subscribe((cart) => {
          obs.next(cart.items.some((i) => i.productId === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
  }

  // public searchProducts(e: String): void {
  //   console.log('func_searchProducts', e); // (ngModelChange)="searchProducts($event)"
  //   this.products
  //     .map(products => {
  //       console.log('map-rahul');
  //       // const fp = products.filter(prod => prod.name === e);
  //       // console.log('fp', fp);
  //     }
  //     );
  // }

  // ngOnInit() {
  // }

}
