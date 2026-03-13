import { Component, inject } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule],
  styleUrl: './signup.css',
})
export class Signup {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  ErrorMsg: string = '';  
  isLoading: boolean = false;
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/)]),
    rePassword: new FormControl(null,[Validators.required]),
    dateOfBirth: new FormControl(null,Validators.required),
    gender: new FormControl(null,Validators.required),
  }, {validators: this.confirmPassword});

  signUp(){
    if(this.registerForm.valid){
      this.isLoading = true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.isLoading = false;
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.log('Signup failed:', error);
          this.ErrorMsg = error.message;
          this.isLoading = false;
        }
      })
    }
  }

  confirmPassword(formGroup: any){
    let password = formGroup.get('password').value;
    let rePassword = formGroup.get('rePassword').value;
    if(password !== rePassword){
      return {mismatch: true};
    } else {
      return null;
    }
  }

  ngOnInit() {
    initFlowbite();
  }
}
