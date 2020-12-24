import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../../../services/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostUserResolverService {
  constructor(private postService: PostService) {}

  // resolve(route : ActivatedRouteSnapshot) : Observable<any>{
  //   return this.postService.getPostUser();
  // }
}
