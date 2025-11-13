import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {someObject} from '../model';
import {Testcompitem} from './testcompitem/testcompitem';

@Component({
  selector: 'app-testcomp',
  imports: [
    Testcompitem
  ],
  templateUrl: './testcomp.html',
  styleUrl: './testcomp.css',
})
export class Testcomp implements OnInit{

  isLoading = signal(true);
  testObjects: someObject[] = [];

  private http: HttpClient = inject(HttpClient);


  protected doIt() {
    this.http.get('http://localhost:8080/test', {withCredentials: true}).subscribe({
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
}
