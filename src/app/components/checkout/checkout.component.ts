import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cartitem } from 'app/models/cartitem.model';
import { Deliveryoption } from 'app/models/deliveryoption.model';
import { Product } from 'app/models/product.model';
import { Shoppingcart } from 'app/models/shoppingcart.model';
import { DeliveryoptionsService } from 'app/services/deliveryoptions.service';
import { ProductsService } from 'app/services/products.service';
import { ShoppingcartService } from 'app/services/shoppingcart.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface ICartItemWithProduct extends Cartitem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  // constructor() { }

  // ngOnInit() {
  // }
  public deliveryOptions: Observable<Deliveryoption[]>;
  public cart: Observable<Shoppingcart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: Product[];
  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsService,
    private deliveryOptionService: DeliveryoptionsService,
    private shoppingCartService: ShoppingcartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: Deliveryoption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.productId);
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity
            };
          });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
