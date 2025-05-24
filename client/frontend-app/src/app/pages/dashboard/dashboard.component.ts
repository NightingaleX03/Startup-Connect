import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupProfileCardComponent } from '../../components/startup-profile-card/startup-profile-card.component';
import { LocalGroupsComponent } from '../../components/local-groups/local-groups.component';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StartupProfileCardComponent, LocalGroupsComponent, LeaderboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });
  }

}
