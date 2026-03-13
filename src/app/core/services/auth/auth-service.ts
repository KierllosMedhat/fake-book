import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  signUp(userData: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/users/signup', userData);
  }

  signIn(userData: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/users/signin', userData);
  }

  logOut() {
    this.router.navigate(['/signin']);
    localStorage.removeItem('token');
  }

  changePassword(passwordData: any): Observable<any> {
    return this.httpClient.patch(environment.baseUrl + '/users/change-password', passwordData);
  }

  getProfile(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/users/profile-data');
  }
}
