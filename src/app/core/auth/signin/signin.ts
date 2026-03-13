import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  ErrorMsg: string = '';  
  isLoading: boolean = false;
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/)]),
  });

    signIn(){
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Signin successful:', response);
          this.isLoading = false;
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/timeline']);
        },
        error: (error) => {
          console.log('Signin failed:', error);
          this.ErrorMsg = error.message;
          this.isLoading = false;
        }
      })
    }
  }
}
