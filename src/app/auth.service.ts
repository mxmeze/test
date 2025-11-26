import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly BACKEND_URL: string = environment.apiUrl;
  private readonly LOGIN_URL: string = this.BACKEND_URL + '/auth/login';
  private readonly REGISTER_URL: string = this.BACKEND_URL + '/auth/register';
  private readonly CHECK_URL: string = this.BACKEND_URL + '/test';
  private http: HttpClient = inject(HttpClient);
  isLoggedIn = signal(true);

  constructor() {
    this.checkSession();
  }

  checkSession() {
    this.http.get(this.CHECK_URL, {withCredentials: true}).subscribe({
      next: response => {
        this.isLoggedIn.set(true);
      },
      error: err => {
        this.isLoggedIn.set(false);
      }
    })
  }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(this.LOGIN_URL, {username, password}, {withCredentials: true});
  }

  register(username: string, email: string, password: string, passwordConfirm: string): Observable<Object> {
    if(this.isLoggedIn()){
      return new Observable(observer => {console.log('register but logged in')});
    }
    if(password != passwordConfirm){
      return new Observable(observer => {console.log('password didnt match')});
    }
    return this.http.post(this.REGISTER_URL, {username, password, email})
  }

  setLoggedIn(sessionId: string): void {
    this.isLoggedIn.set(true);
    sessionStorage.setItem('sessionId', sessionId);
  }

  setLoggedOut(): void {
    this.isLoggedIn.set(false);
  }


}
