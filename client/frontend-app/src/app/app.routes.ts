import { NgModule } from '@angular/core';

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
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'profile/:username', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:username', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: 'funding', component: FundingComponent, canActivate: [AuthGuard] },
  {
    path: 'scale-up',
    loadComponent: () => import('./pages/scale-up/scale-up.component').then(m => m.ScaleUpComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'startup/social-hub/:username',
    component: SocialHubComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vc-firms',
    loadComponent: () => import('./pages/vc-firms/vc-firms.component').then(m => m.VcFirmsComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
