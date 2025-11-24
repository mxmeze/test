import {Component, inject, Input} from '@angular/core';
import {SomeObject} from '../../model';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-testcompform',
  imports: [],
  templateUrl: './testcompform.html',
  styleUrl: './testcompform.css',
})
export class Testcompform {
  @Input() objId?: number;
  someObject: SomeObject= {name: '', email: '', someNumber: -1};
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    someNumber: new FormControl(),
    email: new FormControl(),
  });
  private http: HttpClient = inject(HttpClient);


  constructor() {
    this.getData();
  }

  isCreate(): boolean {
    // if we have an object with id it was passed by parent component for edit
    return this.objId === null;
  }

  getData() {
    if(this.isCreate()) {
      this.http.get('http://localhost:8080/test/' + this.objId).subscribe(data => {
        console.log(data);
        this.form.setValue(data);
      });
    }
  }

  submit() {

    this.someObject.name = this.form.value.name;
    this.someObject.email = this.form.value.email;
    this.someObject.someNumber = this.form.value.someNumber;
    if(this.isCreate()) {
      this.http.post('http://localhost:8080/test/create', this.someObject).subscribe();
    } else {
      this.http.patch('http://localhost:8080/test/update', this.someObject).subscribe();
    }

  }
 


}
