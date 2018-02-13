import { Injectable } from '@angular/core';

// service used
import { StorageService } from 'app/services/storage.service';
// model used
import { User } from '../models/user.model';

const USER_KEY = 'userinfo';

@Injectable()
export class UserdataService {
  private storage: Storage;
  public constructor(private storageService: StorageService) {
    this.storage = this.storageService.get();
  }

  public addUser(newuser: User): void {
   const usersList = this.retrieve();
  let user = usersList.find((u) => u.email === newuser.email);

    if (user === undefined) {
      const usersObj = { users: [] };
      user = new User();
      user.username = newuser.username;
      user.email = newuser.email;
      user.password = newuser.password;
      usersList.push(user);
      usersObj.users = usersList;
      this.save(usersObj);
    }else {
      window.alert('User Already Exist !!');
    }

  }

  public verify(olduser: User): boolean {
    const usersList = this.retrieve();
    const user = usersList.find((u) => u.email === olduser.email);
    if (user === undefined) {
      return false;
    } else if (user.password === olduser.password) {
      return true;
    }
    return false;
  }

  private save(user: {}): void {
    this.storage.setItem(USER_KEY, JSON.stringify(user));
  }

  private retrieve(): User[] {
    const storedUser = JSON.parse(this.storage.getItem(USER_KEY));
    return storedUser.users;
  }
}
