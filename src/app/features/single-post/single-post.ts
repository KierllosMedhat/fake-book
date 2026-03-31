import { Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../core/services/posts/posts';
import { Ipost } from '../../core/models/ipost';
import { SingleComment } from '../comments/components/single-comment/single-comment';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comments } from '../../core/services/comments/comments';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-single-post',
  imports: [SingleComment, ReactiveFormsModule, RouterLink, DatePipe, MatMenuModule, MatButtonModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit{
  private readonly postsService = inject(Posts);
  private readonly commentService = inject(Comments);
  isLoading: boolean = false;
  ErrorMsg: string = '';
  
  postsList: Ipost[] = [];
  commentValue: FormControl = new FormControl(null, [Validators.required]);
  
  ngOnInit(): void{
    this.getAllPosts();
  }

  getAllPosts() {
    this.isLoading = true;
    this.postsService.getAllPosts().subscribe({
      next: (posts) => {
        this.postsList = posts.data.posts;
        this.isLoading = false;
      },
      error: (error) => {        
        console.error('Error fetching posts:', error);
      }
    });
  }

  createComment(event: SubmitEvent, postId: string) {
    event.preventDefault();
    this.isLoading = true;
    let fomrData = new FormData();
    fomrData.append('content', this.commentValue.value);
    this.commentService.createComment(fomrData, postId).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      }
    })
  }
  
    bookmarkPost(postId: string) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoading = true;
      this.postsService.bookmarkPost(postId).subscribe({
        next: (response) => {
          console.log('Post bookmarked successfully:', response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error bookmarking post:', error);
          this.ErrorMsg = 'Failed to bookmark post.';
          this.isLoading = false;
        },
      });
    }
  }
}
