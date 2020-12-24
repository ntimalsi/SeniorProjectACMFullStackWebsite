import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurUserResolveService implements Resolve<any> {
  constructor(private authService: AuthService) {}
  isLogged: boolean = false;

  resolve(route: ActivatedRouteSnapshot) {
    this.isLogged = this.authService.isLogged();
    this.authService.authSubsListner().subscribe(value => {
      this.isLogged = value;
    });
    if (!this.isLogged) {
      return null;
    }
    return this.authService.setCurUserInfo();
  }
}
