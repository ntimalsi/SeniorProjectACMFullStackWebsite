import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading: boolean = false;
  posts;
  nposts;
  isDataLoaded: boolean  = false; 

  constructor(
    private postsService: PostService,
    // private route: ActivatedRoute
  ) {
    this.postsService.getPosts().subscribe((result) =>{
      this.posts = result.posts;
      this.posts = this.posts.sort((a, b) => b.time - a.time);
      this.isDataLoaded = true;
    })
  }

 

  ngOnInit(): void { }
}
