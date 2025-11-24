import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Impress } from './pages/impress/impress';
import { Testcompform } from './pages/testcompform/testcompform';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'impress', component: Impress },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'test/:id', component: Testcompform },
  { path: 'test/create', component: Testcompform },
  { path: '**', redirectTo: 'home' },
];
