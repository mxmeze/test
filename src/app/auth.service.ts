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
  private logger: LoggerService = inject(LoggerService);
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

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.LOGIN_URL, {username, password}, {withCredentials: true});
  }

  register(username: string, email: string, password: string, passwordConfirm: string): Observable<RegisterResponse> {
    if(this.isLoggedIn()){
      this.logger.warn('Attempted registration while already logged in');
      return throwError(() => new Error('Already logged in'));
    }
    if(password !== passwordConfirm){
      this.logger.warn('Password confirmation mismatch');
      return throwError(() => new Error('Passwords do not match'));
    }
    return this.http.post<RegisterResponse>(this.REGISTER_URL, {username, password, email});
  }

  setLoggedIn(sessionId: string): void {
    this.isLoggedIn.set(true);
    sessionStorage.setItem('sessionId', sessionId);
  }

  setLoggedOut(): void {
    this.isLoggedIn.set(false);
  }


}
