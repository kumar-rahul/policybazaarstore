import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class OnlyloggedinusersGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { };

  canActivate() {
    console.log('OnlyLoggedInUsers');
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert('Please login to perform checkout !!');
      this.router.navigate(['/']);
      return false;
    }
  }
}
