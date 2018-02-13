import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';

// providers path
import { AuthService } from './services/auth.service';
import { UserdataService } from './services/userdata.service';
import { ProductsService } from './services/products.service';
import { ShoppingcartService } from './services/shoppingcart.service';
import { DeliveryoptionsService } from './services/deliveryoptions.service';
import { StorageService, LocalStorageServie } from './services/storage.service';
// pipes
import { FilterPipe } from './pipes/filter.pipe';
// guards
import { SelectedcartGuard } from './routerguards/selectedcart.guard';
import { OnlyloggedinusersGuard } from './routerguards/Onlyloggedinusers.guard';
// components path
import { AppComponent } from './app.component';
import { StorefrontComponent } from './components/storefront/storefront.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderconfirmationComponent } from './components/orderconfirmation/orderconfirmation.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    StorefrontComponent,
    ShoppingcartComponent,
    FilterPipe,
    CheckoutComponent,
    OrderconfirmationComponent,
    UserloginComponent,
    UsersignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ProductsService,
    ShoppingcartService,
    DeliveryoptionsService,
    SelectedcartGuard,
    OnlyloggedinusersGuard,
    AuthService,
    UserdataService,
    LocalStorageServie,
            { provide: StorageService, useClass: LocalStorageServie }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
