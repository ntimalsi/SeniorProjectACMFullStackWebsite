import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  // isLoggedIn: boolean = false;
  constructor() {}

  ngOnInit(): void {
    // console.log('in feed comp');
    // this.isLoggedIn = this.authService.isLogged();
    // this.authService.authSubsListner().subscribe(isAuthenticated => {
    //   this.isLoggedIn = isAuthenticated;
    // });
  }
}
