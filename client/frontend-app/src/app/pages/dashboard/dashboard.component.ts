import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
=======
import { ActivatedRoute } from '@angular/router';
>>>>>>> ee58c7e05ad7d585100b543223a87fc6e24567e6
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
<<<<<<< HEAD
  profileTags: string[] = [];
  newsArticles: any[] = [];
  newsLoading = false;
  newsError = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onTagsChange(tags: string[]) {
    this.profileTags = tags;
    this.fetchNews();
  }

  fetchNews() {
    this.newsLoading = true;
    this.newsError = '';
    const apiKey = '88aff111cfb140a3afa3d4647d677e2e'; // NewsAPI.org API key
    let url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=6&apiKey=${apiKey}`;
    if (this.profileTags.length) {
      const query = encodeURIComponent(this.profileTags.join(' OR '));
      url += `&q=${query}`;
    }
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
=======

  username: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });
  }

>>>>>>> ee58c7e05ad7d585100b543223a87fc6e24567e6
}
