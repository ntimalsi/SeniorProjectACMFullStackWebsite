import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-one-announce',
  templateUrl: './one-announce.component.html',
  styleUrls: ['./one-announce.component.scss']
})
export class OneAnnounceComponent implements OnInit {
  constructor() {}

  @Input() announce;
  announcement;
  visible: boolean = false;
  bg: boolean = false;

  grayBg: boolean = false;

  change(value: boolean): void {
    this.grayBg = value;
  }

  ngOnInit(): void {
    this.announcement = this.announce;
  }

  clickMe(): void {
    this.visible = false;
  }

  getbg() {
    if (this.bg) {
      return 'rgb(238, 238, 238)';
    }
  }
}
