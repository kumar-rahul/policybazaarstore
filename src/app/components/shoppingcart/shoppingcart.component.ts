import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Product } from 'app/models/product.model';
import { ProductsService } from 'app/services/products.service';
import { Shoppingcart } from 'app/models/Shoppingcart.model';
import { ShoppingcartService } from 'app/services/shoppingcart.service';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit, OnDestroy {

  public products: Observable<Product[]>;
  public cart: Observable<Shoppingcart>;
  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsService,
    private shoppingCartService: ShoppingcartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // constructor() { }

  // ngOnInit() {
  // }

}
