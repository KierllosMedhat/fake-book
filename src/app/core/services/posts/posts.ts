import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly httpClient = inject(HttpClient);
  headerToken:any;

  //constructor() {
   // this.setHeaderToken();
  //}

  // setHeaderToken() {
  //   this.headerToken = {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token')
  //       }
  //     };
  // }
  
  getAllPosts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/posts');
  }

  createPost(postData:any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/posts', {postData});
  }

  deletePost(postId:any): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + '/posts/' + postId);
  }

  updatePost(postId:any, postData:any): Observable<any> {
    return this.httpClient.put(environment.baseUrl + '/posts/' + postId, {postData});
  }

  bookmarkPost(postId:any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/posts/' + postId + '/bookmark', {});
  }

  likePost(postId:any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/posts/' + postId + '/like', {});
  }
  

  getPostById(postId:any): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/posts/' + postId);
  }

  getPostsByUserId(userId:any): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/users/'+ userId + '/posts/');
  }
}
