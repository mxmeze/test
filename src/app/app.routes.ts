import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {Register} from './register/register';
import {Home} from './home/home';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
];
