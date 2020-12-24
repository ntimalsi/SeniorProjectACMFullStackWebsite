import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  private authStatus: Subscription;
  isLoggedIn: boolean = false;
  stdmat: boolean = false;

  isCollapsed = false;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    this.authStatus = this.authService
      .authSubsListner()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  setStdmat() {
    this.stdmat = true;
  }

  unsetStdmat() {
    this.stdmat = false;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.unsetStdmat();
    this.authService.logout();
  }
}
