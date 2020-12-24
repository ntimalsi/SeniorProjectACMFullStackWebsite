import { Injectable } from '@angular/core';
import { CurUser } from '../models/curuser.model';

@Injectable({
  providedIn: 'root'
})
export class CurUserService {
  curUser: CurUser;

  getUser() {
    return this.curUser;
  }

  setUser(user: CurUser) {
    this.curUser = user;
  }

  constructor() {}
}
