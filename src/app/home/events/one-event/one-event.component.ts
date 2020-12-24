import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-one-event',
  templateUrl: './one-event.component.html',
  styleUrls: ['./one-event.component.scss']
})
export class OneEventComponent implements OnInit {
  @Input() event;
  newEvent;
  visible: boolean = false;
  bg: boolean = false;

  grayBg: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.newEvent = this.event;
  }

  change(value: boolean): void {
    this.grayBg = value;
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
