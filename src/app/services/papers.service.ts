import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/internal/operators';
import papers from '../../../backend/models/papers';

@Injectable({
  providedIn: 'root'
})
export class PapersService {

  constructor(
    private http: HttpClient
  ) { }

  addPaper (
    creator: string,
    exam: string,
    subjects: string,
    branch: string,
    semester: number,
    sessionFrom : string,
    sessionTo : string,
    file: File
  ) :Observable<any> {
    const paper = new FormData();
    paper.append('creator', creator);
    paper.append('exam', exam);
    paper.append('subjects', subjects);
    paper.append('sessionFrom', sessionFrom);
    paper.append('sessionTo', sessionTo);
    paper.append('branch', branch);
    paper.append('semester', semester.toString());
    paper.append('date', Date.now().toString());
    paper.append('file', file, file.name);
    console.log('paper service ' + paper);
    paper.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    return this.http
      .post<{ paper; pid: string }>(
        'http://turing.cs.olemiss.edu:5001/api/papers/create',
        paper
      );
  }

  getPapers(): Observable<any> {
    return this.http.get<[]>('http://turing.cs.olemiss.edu:5001/api/papers');
  }

  getFile(filename: string) {
    let file = { filename: filename };
    this.http
      .post('http://turing.cs.olemiss.edu:5001/api/papers/getfile', file, {
        responseType: 'blob'
      })
      .subscribe((response: any) => {
        //download the file
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  filterRes(filterItems: object) {
    console.log(filterItems);
    return this.http.post(
      'http://turing.cs.olemiss.edu:5001/api/papers/filter',
      filterItems
    );
  }

  searchEntries(term) {
    console.log(term);
    let search = { search: term };
    return this.http.post('http://turing.cs.olemiss.edu:5001/api/papers/search', search);
  }

  deleteFile(id: string) : Observable<any> {
    return this.http
      .delete('http://turing.cs.olemiss.edu:5001/api/papers/' + id);
  }
}
