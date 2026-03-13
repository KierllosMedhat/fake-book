import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Comments {
   private readonly httpClient = inject(HttpClient);
   headerToken:any;

  // constructor() {
  //   this.setHeaderToken();
  // }

  // setHeaderToken() {
  //   this.headerToken = {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token')
  //       }
  //     };
  // }

  createComment(commentData:any, postId:any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/posts/' + postId + '/comments', {commentData});
  }

  getPostsComments(postId:any): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/posts/' + postId + '/comments');
  }
}
