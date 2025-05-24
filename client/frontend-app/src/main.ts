import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const routes = [
  { path: '', loadComponent: () => import('./app/pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'blog', loadComponent: () => import('./app/pages/blog/blog.component').then(m => m.BlogComponent) },
  { path: 'about', loadComponent: () => import('./app/pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'auth', loadComponent: () => import('./app/pages/auth/auth.component').then(m => m.AuthComponent) },
  { path: 'startup/profile', loadComponent: () => import('./app/pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'startup/mental-health', loadComponent: () => import('./app/pages/mental-health/mental-health.component').then(m => m.MentalHealthComponent) },
  { path: 'startup/social-hub', loadComponent: () => import('./app/pages/social-hub/social-hub.component').then(m => m.SocialHubComponent) },
  { path: 'dashboard-temp', loadComponent: () => import('./app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));
