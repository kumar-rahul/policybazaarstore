import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorefrontComponent } from './components/storefront/storefront.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { OrderconfirmationComponent } from './components/orderconfirmation/orderconfirmation.component';

import { SelectedcartGuard } from './routerguards/selectedcart.guard';
import { OnlyloggedinusersGuard } from './routerguards/Onlyloggedinusers.guard';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                canActivate: [SelectedcartGuard],
                component: CheckoutComponent,
                path: 'checkout'
            },
            {
                canActivate: [SelectedcartGuard, OnlyloggedinusersGuard],
                component: OrderconfirmationComponent,
                path: 'confirmed'
            },
            {
                component: StorefrontComponent,
                path: 'store'
            },
            {
                component: HomeComponent,
                path: '**'
            }])
    ]
})
export class AppRoutingModule { }
