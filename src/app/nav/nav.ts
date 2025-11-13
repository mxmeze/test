import {Component, inject} from '@angular/core';
import {routes} from "../app.routes";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-nav',
  imports: [],
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  BASE_URL: string = 'http://localhost:4200';
    protected readonly routes = [
      {title: 'Login', url: this.BASE_URL + '/login', protected: false},
      {title: 'Register', url: this.BASE_URL + '/register', protected: false},
      {title: 'Home', url: this.BASE_URL + '/home', protected: true},
      {title: 'Profile', url: this.BASE_URL + '/profile', protected: true},

    ];
  auth: AuthService = inject(AuthService);

  // if route is unprotected its not relevant for the user, so include
  protected shouldIncludeRoute(route: {protected: boolean}): boolean {
    if(this.auth.isLoggedIn()) {
      return route.protected;
    } else {
      return !route.protected;
    }
  }
}
