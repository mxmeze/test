import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModelActions, SomeObject} from '../../model';
import {Testcompitem} from './testcompitem/testcompitem';
import {Router} from '@angular/router';
import {LoggerService} from '../../services/logger.service';
import {environment} from '../../../environments/environment';

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
  private readonly BASE_URL = `${environment.apiUrl}/test`;

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private logger = inject(LoggerService);


  protected doIt() {
    this.http.get(this.BASE_URL, {withCredentials: true})
      .pipe(take(1))
      .subscribe({
      next: data => {
        this.testObjects = [];
        for (let dataKey in data) {
          // @ts-ignore
          this.testObjects.push(data[dataKey]);
        }
        this.logger.debug('Test objects loaded', this.testObjects);
        this.isLoading.set(false);
        },
      error: err => {
        this.logger.error('Failed to load test objects', err);
        this.isLoading.set(false);
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
    this.http.delete(this.BASE_URL + '/delete/' + object.id, {withCredentials: true})
      .pipe(take(1))
      .subscribe({
      next : data => {
        this.testObjects = this.testObjects.filter(testObject => testObject.id !== object.id );
        this.logger.debug('Object deleted', object.id);
      },
      error: err => {
        this.logger.error('Failed to delete object', err);
      }
    })
  }
}
