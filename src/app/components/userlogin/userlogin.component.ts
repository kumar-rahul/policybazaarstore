import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// services used
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  public user: Object;
  public signup_user: Object;
  public isLogin: boolean;
  constructor(private router: Router, private userDataService: UserdataService, private authService: AuthService) {
    this.user = {email: '', password: ''};
    this.signup_user = {};
    this.isLogin = true;
   }

  ngOnInit() {
  }

  public validateUser(user): void {
    let status: boolean;

    if (typeof user.email !== 'undefined' && user.email.length > 0 && typeof user.password !== 'undefined' && user.password.length > 0) {
      status = this.userDataService.verify(user);
      if (status) {
        this.router.navigate(['/store']);
      } else {
        window.alert('Login Failed !!');
      }
      this.authService.setLoggedInStatus(status);
    }else {
      window.alert('Invalid login fields !!');
    }

  }

  public navToSignup(): void {
    console.log('func_navToSignup');
    this.isLogin = false;
  }

  public registerUser(user): void {

    if (typeof user.username !== 'undefined' && user.username.length > 0 &&
      typeof user.email !== 'undefined' && user.email.length > 0 &&
    typeof user.password !== 'undefined' && user.password.length > 0) {

      this.isLogin = true;
      this.userDataService.addUser(user);
    } else {
      window.alert('Invalid signup fields !!');
    }

  }

  public navToLogin(): void {
    console.log('func_navToLogin()');
    this.isLogin = true;
  }
}
