import {Component, EventEmitter, Input, output, Output} from '@angular/core';
import {ModelActions, SomeObject} from '../../../model';



@Component({
  selector: 'app-testcompitem',
  imports: [],
  standalone: true,
  templateUrl: './testcompitem.html',
  styleUrl: './testcompitem.css',
})
export class Testcompitem {
  @Input() someObject?: SomeObject;
  @Input() edit: boolean = false;
  action = output<ModelActions>();

  emitEvent(action: ModelActions): void {
    this.action.emit(action);
  }


}
