import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private http: HttpClient
  ) {}

  reloadComponent() {
    window.location.reload();
  }

  addEvent(
    creator: string,
    title: string,
    description: string,
    dates: Date[],
    time: any,
    files: File[]
  ) :Observable<any> {
    const event = new FormData();
    event.append('creator', creator);
    event.append('title', title);
    event.append('description', description);
    let df = dates[0].toString();
    let dt = dates[1].toString();
    event.append('dateFrom', df);
    console.log('dates ' + df + ' ' + dt);
    event.append('dateTo', dt);
    event.append('time', time.toString());
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        event.append('files[]', files[i], files[i].name);
      }
    } else {
      event.append('files[]', null);
    }
    console.log('event service ' + event);
    event.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    return this.http
      .post<{ event; eid: string }>(
        'http://turing.cs.olemiss.edu:5001/api/event/create',
        event
      );
  }

  getEvents(): Observable<any> {
    return this.http.get<[]>('http://turing.cs.olemiss.edu:5001/api/event');
  }
}
