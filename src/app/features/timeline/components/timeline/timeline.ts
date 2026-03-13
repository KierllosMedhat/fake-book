import { Component, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { CreatePost } from "../../../create-post/create-post";
import { SinglePost } from '../../../single-post/single-post';
@Component({
  selector: 'app-timeline',
  imports: [CreatePost, SinglePost],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements OnInit {

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token!);
  }

}
