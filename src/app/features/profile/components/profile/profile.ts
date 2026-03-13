import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { Iprofile } from '../../models/iprofile';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile-service';
import { RouterLink } from '@angular/router';
import { Posts } from '../../../../core/services/posts/posts';
import { Ipost } from '../../../../core/models/ipost';
import { SingleComment } from '../../../comments/components/single-comment/single-comment';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-profile',
  imports: [DatePipe, ReactiveFormsModule, RouterLink, SingleComment],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly postsService = inject(Posts);

  ErrorMsg: string = '';
  isLoading: boolean = false;
  profileDetails!: Iprofile;
  userPosts!: Ipost[];

  ngOnInit(): void {
    this.loadUserProfile();
    initFlowbite();
  }

  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoading = true;
      this.authService.getProfile().subscribe({
        next: (profileData) => {
          console.log('Profile Data:', profileData.data.user);
          this.profileDetails = profileData.data.user;
          console.log('Profile Details:', this.profileDetails);
          this.loadUserPosts();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching profile data:', error);
          this.ErrorMsg = 'Failed to load profile data.';
          this.isLoading = false;
        },
      });
    }
  }

  onFileChanged(event: any) {
    this.isLoading = true;
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    this.profileService.updateProfilePhoto(formData).subscribe({
      next: (response) => {
        console.log('Profile photo updated successfully:', response);
        this.isLoading = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating profile photo:', error);
        this.isLoading = false;
        this.ErrorMsg = 'Failed to update profile photo.';
      },
    });
  }

  loadUserPosts() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoading = true;
      this.postsService.getPostsByUserId(this.profileDetails._id).subscribe({
        next: (postsData) => {
          this.userPosts = postsData.data.posts;
          console.log(this.userPosts);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching user posts:', error);
          this.ErrorMsg = 'Failed to load user posts.';
          this.isLoading = false;
        },
      });
    }
  }

  deletePost(postId: string) {
    const token = localStorage.getItem('token');
    if (token && confirm('Are you sure you want to delete this post?')) {
      this.isLoading = true;
      this.postsService.deletePost(postId).subscribe({
        next: (response) => {
          console.log('Post deleted successfully:', response);
          this.loadUserPosts();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          this.ErrorMsg = 'Failed to delete post.';
          this.isLoading = false;
        },
      });
    }
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
