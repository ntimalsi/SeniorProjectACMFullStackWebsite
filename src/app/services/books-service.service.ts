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

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  reloadComponent() {
    window.location.reload();
  }

  addBook(
    creator: string,
    title: string,
    author: string,
    branch: string,
    semester: number,
    file: File
  ) : Observable<any> {
    const book = new FormData();
    book.append('creator', creator);
    book.append('title', title);
    book.append('author', author);
    book.append('branch', branch);
    book.append('semester', semester.toString());
    book.append('date', Date.now().toString());
    book.append('file', file, file.name);
    console.log('book service ' + book);
    book.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
     return this.http
      .post<{ book; bid: string }>(
        'http://turing.cs.olemiss.edu:5001/api/books/create',
        book
      );
  }

  getBooks(): Observable<any> {
    return this.http.get<[]>('http://turing.cs.olemiss.edu:5001/api/books');
  }

  getFile(filename: string) {
    let file = { filename: filename };
    this.http
      .post('http://turing.cs.olemiss.edu:5001/api/books/getBook', file, {
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
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  filterRes(filterItems: object) {
    console.log(filterItems);
    return this.http.post(
      'http://turing.cs.olemiss.edu:5001/api/books/filter',
      filterItems
    );
  }

  searchEntries(term) {
    console.log(term);
    let search = { search: term };
    return this.http.post('http://turing.cs.olemiss.edu:5001/api/books/search', search);
  }

  deleteFile(id: string) : Observable<any> {
    return this.http
      .delete('http://turing.cs.olemiss.edu:5001/api/books/' + id);
  }
}
