import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  { 
    path: 'services', 
    loadComponent: () => import('./pages/services/services').then(m => m.Services)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  { 
    path: 'impress', 
    loadComponent: () => import('./pages/impress/impress').then(m => m.Impress)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  { 
    path: 'test/:id', 
    loadComponent: () => import('./pages/testcompform/testcompform').then(m => m.Testcompform)
  },
  { 
    path: 'test/create', 
    loadComponent: () => import('./pages/testcompform/testcompform').then(m => m.Testcompform)
  },
  { path: '**', redirectTo: 'home' },
];
