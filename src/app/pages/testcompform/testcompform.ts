import {Component, inject, Input} from '@angular/core';
import {SomeObject} from '../../model';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../../services/logger.service';
import {environment} from '../../../environments/environment';

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
  private logger = inject(LoggerService);
  private readonly BASE_URL = `${environment.apiUrl}/test`;


  constructor() {
    this.getData();
  }

  isCreate(): boolean {
    // if we have an object with id it was passed by parent component for edit
    return this.objId === null;
  }

  getData() {
    if(this.isCreate()) {
      this.http.get(this.BASE_URL + '/' + this.objId)
        .pipe(take(1))
        .subscribe({
        next: data => {
          this.logger.debug('Test object loaded', data);
          this.form.setValue(data);
        },
        error: err => {
          this.logger.error('Failed to load test object', err);
        }
      });
    }
  }

  submit() {

    this.someObject.name = this.form.value.name;
    this.someObject.email = this.form.value.email;
    this.someObject.someNumber = this.form.value.someNumber;
    if(this.isCreate()) {
      this.http.post(this.BASE_URL + '/create', this.someObject)
        .pipe(take(1))
        .subscribe({
          next: () => this.logger.log('Test object created'),
          error: (err) => this.logger.error('Failed to create test object', err)
        });
    } else {
      this.http.patch(this.BASE_URL + '/update', this.someObject)
        .pipe(take(1))
        .subscribe({
          next: () => this.logger.log('Test object updated'),
          error: (err) => this.logger.error('Failed to update test object', err)
        });
    }

  }
 


}
