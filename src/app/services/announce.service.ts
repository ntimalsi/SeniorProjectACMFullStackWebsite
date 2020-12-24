import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {
  constructor(
    private http: HttpClient,
  ) {}

  reloadComponent() {
    window.location.reload();
  }

  addAnnounce(
    creator: string,
    title: string,
    description: string,
    time: any,
    files: File[]
  ) :Observable<any> {
    const announcement = new FormData();
    announcement.append('creator', creator);
    announcement.append('title', title);
    announcement.append('description', description);
    announcement.append('time', time.toString());
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        announcement.append('files[]', files[i], files[i].name);
      }
    } else {
      announcement.append('files[]', null);
    }
    return this.http
      .post<{ announce; aid: string }>(
        'http://turing.cs.olemiss.edu:5001/api/announce/create',
        announcement
      )
  }

  getAnnounces(): Observable<any> {
    return this.http.get<[]>('http://turing.cs.olemiss.edu:5001/api/announce');
  }
}
