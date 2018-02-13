import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.scss']
})
export class OrderconfirmationComponent implements OnInit {

  public constructor(private shoppingCartService: ShoppingcartService) { }

  public ngOnInit(): void {
    this.shoppingCartService.empty();
  }
}
