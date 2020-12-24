import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BooksService } from '../../services/books-service.service';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService {
  constructor(private booksService: BooksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.booksService.getBooks();
  }
}
