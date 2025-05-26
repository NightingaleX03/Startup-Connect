import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StartupProfileCardComponent } from '../../components/startup-profile-card/startup-profile-card.component';
import { LocalGroupsComponent } from '../../components/local-groups/local-groups.component';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StartupProfileCardComponent, LocalGroupsComponent, LeaderboardComponent, NotificationListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profileTags: string[] = [];
  newsArticles: any[] = [];
  newsLoading = false;
  newsError = '';
  username: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
      // You can use this.username as needed
    });
  }

  onTagsChange(tags: string[]) {
    this.profileTags = tags;
    this.fetchNews();
  }

  fetchNews() {
    this.newsLoading = true;
    this.newsError = '';
    const apiKey = '88aff111cfb140a3afa3d4647d677e2e'; // NewsAPI.org API key
    const url = `https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=6&apiKey=${apiKey}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.newsArticles = res.articles || [];
        this.newsLoading = false;
      },
      error: (err) => {
        this.newsError = 'Failed to load news.';
        this.newsLoading = false;
      }
    });
  }
}
