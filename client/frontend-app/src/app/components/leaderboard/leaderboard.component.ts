import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

interface Startup {
  id: number;
  name: string;
  points: number;
  profilePicture: string;
  rank: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DecimalPipe]
})
export class LeaderboardComponent implements OnInit {
  startups$: Observable<Startup[]> | undefined;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.startups$ = this.http.get<Startup[]>('assets/leaderboard.json').pipe(
      map(data =>
        data
          .sort((a, b) => b.points - a.points)
          .slice(0, 8)
          .map((startup, index) => ({
            ...startup,
            rank: index + 1
          }))
      )
    );
  }

  getRankSuffix(rank: number): string {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  }
} 