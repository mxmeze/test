import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  BACKEND_URL: string = 'https://localhost:8080';
  LOGIN_URL: string = this.BACKEND_URL + '/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Object> {
    console.log('login', username, password);
    return this.http.post(this.LOGIN_URL, {username, password}).pipe(
      tap(res => console.log(res)),
    )
  }

  register(): void {

  }
}
