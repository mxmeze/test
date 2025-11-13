import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  BACKEND_URL: string = 'http://localhost:8080';
  LOGIN_URL: string = this.BACKEND_URL + '/auth/login';
  REGISTER_URL: string = this.BACKEND_URL + '/auth/register';
  CHECK_URL: string = this.BACKEND_URL + '/test';
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
    console.log('login', username, password);
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
