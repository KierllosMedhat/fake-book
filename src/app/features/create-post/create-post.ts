import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Posts } from '../../core/services/posts/posts';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost {
  private readonly postService = inject(Posts)
  // prepare uploaded image for post creation
  uploadedImg: any;
  postDescription: FormControl = new FormControl(null, [Validators.required]);

  prepareUploadedImg(event: Event): void {
    let input = event.target as HTMLInputElement;
    this.uploadedImg = input.files![0];
    console.log(this.uploadedImg);
    
  }

  createPost(event: Event): void {
    event.preventDefault();
    let fromData = new FormData();
    fromData.append('body', this.postDescription.value);
    fromData.append('image', this.uploadedImg);
    this.postService.createPost(fromData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
