import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { User } from '../../core/models/ipost';

@Component({
  selector: 'app-mainlayout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css',
})
export class Mainlayout {
}
