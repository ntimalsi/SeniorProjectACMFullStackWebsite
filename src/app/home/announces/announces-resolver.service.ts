import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AnnounceService } from '../../services/announce.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncesResolverService implements Resolve<any> {
  constructor(private announceService: AnnounceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.announceService.getAnnounces();
  }
}
