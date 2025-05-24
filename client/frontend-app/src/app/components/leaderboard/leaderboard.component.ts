import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

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
  imports: [CommonModule],
  providers: [DecimalPipe]
})
export class LeaderboardComponent implements OnInit {
  startups$: Observable<Startup[]>;
  error: string | null = null;

  constructor() {
    this.startups$ = this.loadLeaderboardData();
  }

  ngOnInit() {
    console.log('Leaderboard component initialized');
  }

  loadLeaderboardData(): Observable<Startup[]> {
    console.log('Loading mock leaderboard data...');
    
    const mockData: Startup[] = [
      {
        id: 1,
        name: "TechFlow",
        points: 9850,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechFlow",
        rank: 1
      },
      {
        id: 2,
        name: "InnovateX",
        points: 8750,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateX",
        rank: 2
      },
      {
        id: 3,
        name: "FutureWave",
        points: 7650,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=FutureWave",
        rank: 3
      },
      {
        id: 4,
        name: "SmartScale",
        points: 6540,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=SmartScale",
        rank: 4
      },
      {
        id: 5,
        name: "DataPulse",
        points: 5430,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataPulse",
        rank: 5
      },
      {
        id: 6,
        name: "CloudNine",
        points: 4320,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=CloudNine",
        rank: 6
      },
      {
        id: 7,
        name: "ByteBoost",
        points: 3210,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteBoost",
        rank: 7
      },
      {
        id: 8,
        name: "CodeCraft",
        points: 2100,
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeCraft",
        rank: 8
      }
    ];

    return of(mockData.sort((a, b) => b.points - a.points).map((startup, index) => ({
      ...startup,
      rank: index + 1
    })));
  }

  getRankSuffix(rank: number): string {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  }
} 