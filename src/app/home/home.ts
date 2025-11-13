import { Component } from '@angular/core';
import {Testcomp} from '../testcomp/testcomp';

@Component({
  selector: 'app-home',
  imports: [
    Testcomp
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
