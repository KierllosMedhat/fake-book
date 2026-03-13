import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../../../../core/services/posts/posts';
import { Ipost } from '../../../../core/models/ipost';
import { SingleComment } from "../../../comments/components/single-comment/single-comment";

@Component({
  selector: 'app-post-details',
  imports: [SingleComment],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(Posts);
  postId: string | null = null;
  postDetails!: Ipost;
  ngOnInit(): void {
    this.getPostId();
  }

  getPostId() {
    this.activatedRoute.paramMap.subscribe(urlPath => {
      this.postId = urlPath.get('id');
    });
  this.getPostDetails();
  }

  getPostDetails() {
    this.postService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.postDetails = post.data.post;
      },
      error: (error) => {
        console.error('Error fetching post details:', error);
      }
    });
  }
}