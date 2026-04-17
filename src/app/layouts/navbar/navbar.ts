import { Component, inject, Input, signal, ViewChild, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth-service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Iuser } from '../../core/models/iuser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatMenuModule, MatButtonModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  @Input() isLoggedIn:boolean = false;
  userData:WritableSignal<Iuser>=signal({} as Iuser)
  
  ngOnInit(): void {
    this.getUserData();
    initFlowbite();
  }

  logOut() {
    this.authService.logOut();
  }

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  getUserData(){
    this.authService.getProfile().subscribe({
      next:(res)=>{
        this.userData.set(res.data.user);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
