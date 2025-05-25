import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TeamComponent } from './pages/team/team.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { FundingComponent } from './pages/funding/funding.component';
import { SocialHubComponent } from './pages/social-hub/social-hub.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
/*import { AuthGuard } from './pages/auth/auth.guard';*/

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'team', component: TeamComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'social-hub', component: SocialHubComponent },
  { path: 'dashboard', component: DashboardComponent },
  /*{ path: 'dashboard/:username', component: DashboardComponent, canActivate: [AuthGuard] },*/
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'funding', component: FundingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
