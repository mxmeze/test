import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelActions, SomeObject} from '../../model';
import {Testcompitem} from './testcompitem/testcompitem';
import {Router} from '@angular/router';

@Component({
  selector: 'app-testcomp',
  imports: [
    Testcompitem,
  ],
  templateUrl: './testcomp.html',
  styleUrl: './testcomp.css',
})
export class Testcomp implements OnInit{
  isLoading = signal(true);
  testObjects: SomeObject[] = [];
  BASE_URL = 'http://localhost:8080/test';

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);


  protected doIt() {
    this.http.get(this.BASE_URL, {withCredentials: true}).subscribe({
      next: data => {
        this.testObjects = [];
        for (let dataKey in data) {
          // @ts-ignore
          this.testObjects.push(data[dataKey]);
          console.log(this.testObjects)
        }
        this.isLoading.set(false);
        },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.doIt();
  }

  protected performAction(object: SomeObject, $event: ModelActions) {
    if($event === 'DELETE') {
      this.delete(object);
    } else if ($event === 'EDIT') {
      // navigate to route for edit
      this.router.navigateByUrl('/test');
    }
  }

  private delete(object: SomeObject) {
    this.http.delete(this.BASE_URL + '/delete/' + object.id, {withCredentials: true}).subscribe({
      next : data => {
        this.testObjects = this.testObjects.filter(testObject => testObject.id !== object.id );
        console.log(this.testObjects);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
