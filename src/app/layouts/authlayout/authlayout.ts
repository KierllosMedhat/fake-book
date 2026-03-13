import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './authlayout.html',
  styleUrl: './authlayout.css',
})
export class Authlayout {

}
