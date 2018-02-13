import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Deliveryoption } from '../models/deliveryoption.model';
import { CachingService } from './caching.service';

@Injectable()
export class DeliveryoptionsService extends CachingService {

  // constructor() { }
  private deliveryOptions: Observable<Deliveryoption[]>;

  public constructor(private http: Http) {
    super();
  }

  public all(): Observable<Deliveryoption[]> {
    return this.cache<Deliveryoption[]>(() => this.deliveryOptions,
      (val: Observable<Deliveryoption[]>) => this.deliveryOptions = val,
      () => this.http
        .get('./assets/delivery-options.json')
        .map((response) => response.json()
          .map((item) => {
            const model = new Deliveryoption();
            model.updateFrom(item);
            return model;
          })));

  }
}
