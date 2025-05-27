import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TeamComponent } from './pages/team/team.component';
// import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { FundingComponent } from './pages/funding/funding.component';
import { SocialHubComponent } from './pages/social-hub/social-hub.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from './pages/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'team', component: TeamComponent },
  { path: 'profile/:username', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:username', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'funding', component: FundingComponent },
  {
    path: 'scale-up',
    loadComponent: () => import('./pages/scale-up/scale-up.component').then(m => m.ScaleUpComponent)
  },
  {
    path: 'social-hub',
    loadComponent: () => import('./pages/social-hub/social-hub.component').then(m => m.SocialHubComponent)
  },
  {
    path: 'vc-firms',
    loadComponent: () => import('./pages/vc-firms/vc-firms.component').then(m => m.VcFirmsComponent)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
