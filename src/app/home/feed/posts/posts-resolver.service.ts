import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { PostService } from '../../../services/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolverService implements Resolve<any> {

  constructor(private postService: PostService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.postService.getPosts();
  }
}
