import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupProfileCardComponent } from '../../components/startup-profile-card/startup-profile-card.component';
import { LocalGroupsComponent } from '../../components/local-groups/local-groups.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StartupProfileCardComponent, LocalGroupsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
