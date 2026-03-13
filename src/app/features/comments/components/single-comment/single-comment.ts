import { Component, inject, Input, OnInit } from '@angular/core';
import { Comments } from '../../../../core/services/comments/comments';
import { Icomment } from '../../../../core/models/icomment';

@Component({
  selector: 'app-single-comment',
  imports: [],
  templateUrl: './single-comment.html',
  styleUrl: './single-comment.css',
})
export class SingleComment implements OnInit {
  private readonly commentService = inject(Comments);
  commentList: Icomment[] = [];

  @Input() postId!:string;

  ngOnInit() {
    this.getComments();
  }

  getComments(){
    this.commentService.getPostsComments(this.postId).subscribe(
      (res)=>{
      this.commentList = res.data.comments;
    },     (err)=>{
      console.error(err);
    }
  )
  }
}
