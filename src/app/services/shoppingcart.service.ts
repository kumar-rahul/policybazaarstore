import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
// models used
import { Cartitem } from '../models/cartitem.model';
import { Deliveryoption } from '../models/deliveryoption.model';
import { Product } from '../models/product.model';
import { Shoppingcart } from '../models/shoppingcart.model';
// services used
import { DeliveryoptionsService } from '../services/deliveryoptions.service';
import { ProductsService } from '../services/products.service';
import { StorageService } from 'app/services/storage.service';

const CART_KEY = 'cart';
@Injectable()
export class ShoppingcartService {

  // constructor() { }
  private storage: Storage;
  private subscriptionObservable: Observable<Shoppingcart>;
  private subscribers: Array<Observer<Shoppingcart>> = new Array<Observer<Shoppingcart>>();
  private products: Product[];
  private deliveryOptions: Deliveryoption[];

  public constructor(private storageService: StorageService,
    private productService: ProductsService,
    private deliveryOptionsService: DeliveryoptionsService) {
    this.storage = this.storageService.get();
    this.productService.all().subscribe((products) => this.products = products);
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);

    this.subscriptionObservable = new Observable<Shoppingcart>((observer: Observer<Shoppingcart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<Shoppingcart> {
    return this.subscriptionObservable;
  }

  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new Cartitem();
      item.productId = product.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new Shoppingcart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: Deliveryoption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  private calculateCart(cart: Shoppingcart): void {
    cart.itemsTotal = cart.items
      .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
      .reduce((previous, current) => previous + current, 0);
    // cart.deliveryTotal = cart.deliveryOptionId ?
    //   this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
    //   0;
    cart.grossTotal = cart.itemsTotal; // + cart.deliveryTotal;
  }

  private retrieve(): Shoppingcart {
    const cart = new Shoppingcart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: Shoppingcart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: Shoppingcart): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          // we want all subscribers to get the update even if one errors.
        }
      });
  }
}
