import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { NotesService } from '../../services/notes.service';

@Injectable({
  providedIn: 'root'
})
export class NotesResolverService implements Resolve<any> {
  constructor(private notesService: NotesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.notesService.getNotes();
  }
}
