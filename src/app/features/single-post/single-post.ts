import { Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../core/services/posts/posts';
import { Ipost } from '../../core/models/ipost';
import { SingleComment } from '../comments/components/single-comment/single-comment';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comments } from '../../core/services/comments/comments';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-post',
  imports: [SingleComment, ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css',
})
export class SinglePost implements OnInit{
  private readonly postService = inject(Posts);
  private readonly commentService = inject(Comments);
  
  postsList: Ipost[] = [];
  commentValue: FormControl = new FormControl(null, [Validators.required]);
  
  ngOnInit(): void{
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.postsList = posts.data.posts;
      },
      error: (error) => {        
        console.error('Error fetching posts:', error);
      }
    });
  }

  createComment(event: SubmitEvent, postId: string) {
    event.preventDefault();
    let fomrData = new FormData();
    fomrData.append('content', this.commentValue.value);
    this.commentService.createComment(fomrData, postId).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      }
    })
  }
}
