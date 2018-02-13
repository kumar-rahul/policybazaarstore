import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private status: boolean;

  constructor() { }

  public setLoggedInStatus(value) {
    this.status = value;
  }

  isLoggedIn(): boolean {
    return this.status;
  }
}
