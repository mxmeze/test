import {Component, Input} from '@angular/core';
import {someObject} from '../../model';

@Component({
  selector: 'app-testcompitem',
  imports: [],
  templateUrl: './testcompitem.html',
  styleUrl: './testcompitem.css',
})
export class Testcompitem {
  @Input() someObject?: someObject;


}
