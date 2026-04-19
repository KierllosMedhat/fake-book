import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
import { AuthService } from '../../core/services/auth/auth-service';
import { Iuser } from '../../core/models/iuser';

@Component({
  selector: 'app-single-post',
  imports: [SingleComment, ReactiveFormsModule, RouterLink, DatePipe, MatMenuModule, MatButtonModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit{
  private readonly postsService = inject(Posts);
  private readonly commentService = inject(Comments);
  private readonly authService = inject(AuthService);

  user: WritableSignal<Iuser>=signal({} as Iuser)
  isLoading: boolean = false;
  ErrorMsg: string = '';
  
  postsList: Ipost[] = [];
  commentValue: FormControl = new FormControl(null, [Validators.required]);
  
  ngOnInit(): void{
    this.getAllPosts();
    this.getLoggedUser();
  }

  getAllPosts() {
    this.isLoading = true;
    this.postsService.getAllPosts().subscribe({
      next: (posts) => {
        this.postsList = posts.data.posts;
        console.log(this.postsList);
        this.isLoading = false;
      },
      error: (error) => {        
        this.ErrorMsg = error.error.message;
        this.isLoading = false;
      }
    });
  }

  getLoggedUser() {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user.set(user.data.user);
      },
      error: (error) => {
        this.ErrorMsg = error.error.message;
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

  likePost(postId: string) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoading = true;
      this.postsService.likePost(postId).subscribe({
        next: (response) => {
          this.isLoading = false;
        },
        error: (error) => {
          this.ErrorMsg = 'Failed to like post.';
          this.isLoading = false;
        },
      });
    }
  }
}
