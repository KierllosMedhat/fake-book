import { Component, inject, Input } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  @Input() isLoggedIn:boolean = false

  ngOnInit(): void {
    initFlowbite();
  }

  logOut() {
    this.authService.logOut();
  }
}
