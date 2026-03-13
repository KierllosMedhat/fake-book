import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
 private readonly authService = inject(AuthService);
 private readonly router = inject(Router);
   ErrorMsg: string = '';  
  isLoading: boolean = false;
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/)])
  });
 changePassword() {
  if (this.changePasswordForm.valid) {
    this.isLoading = true;
    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (response) => {
        console.log('Password change successful:', response);
        this.isLoading = false;
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/timeline']);
      },
      error: (error) => {
        console.log('Password change failed:', error);
        this.ErrorMsg = error.message;
        this.isLoading = false;
      }
    });
  }
 }
}
