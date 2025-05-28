import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';
import { AuthService } from '../../services/auth.service';

interface Achievement {
  title: string;
  points: number;
}

interface Tier {
  name: string;
  description: string;
  achievements: Achievement[];
}

interface AchievementsData {
  tiers: Tier[];
}

interface Progress {
  [key: string]: {
    completed: number;
    total: number;
  };
}

@Component({
  selector: 'app-scale-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LeaderboardComponent],
  templateUrl: './scale-up.component.html',
  styleUrls: ['./scale-up.component.scss']
})
export class ScaleUpComponent implements OnInit {
  tiers: Tier[] = [];
  progress: Progress = {};
  showAllTiers: { [key: string]: boolean } = {};
  approvalStatus: { [key: string]: string } = {};
  approvalDialog = { visible: false, message: '' };
  currentPoints: number = 0;
  leaderboardPosition: number = 0;
  profilePicture: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get profile data
    const profile = this.authService.getProfile();
    if (profile) {
      this.currentPoints = profile.points || 0;
      this.leaderboardPosition = profile.leaderboardPosition || 0;
      this.profilePicture = profile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
    }

    this.http.get<AchievementsData>('assets/achievements.json').subscribe(data => {
      this.tiers = data.tiers;
      // Mock progress for demo
      this.progress = {
        Beginner: { completed: 10, total: this.tiers[0]?.achievements.length || 0 },
        Intermediate: { completed: 5, total: this.tiers[1]?.achievements.length || 0 },
        Expert: { completed: 2, total: this.tiers[2]?.achievements.length || 0 },
        Legendary: { completed: 0, total: this.tiers[3]?.achievements.length || 0 },
      };
      this.tiers.forEach(tier => {
        this.showAllTiers[tier.name] = false;
        tier.achievements.forEach((ach, i) => {
          this.approvalStatus[this.getAchKey(tier.name, i)] = 'none';
        });
      });
    });
  }

  getAchKey(tierName: string, index: number): string {
    return `${tierName}-${index}`;
  }

  approveAchievement(tierName: string, index: number) {
    const key = this.getAchKey(tierName, index);
    this.approvalStatus[key] = 'pending';
    this.showApprovalDialog('Request to approve achievement completion has been sent');
  }

  toggleShowAll(tierName: string) {
    this.showAllTiers[tierName] = !this.showAllTiers[tierName];
  }

  showApprovalDialog(message: string) {
    this.approvalDialog.message = message;
    this.approvalDialog.visible = true;
    setTimeout(() => {
      this.hideApprovalDialog();
    }, 3000);
  }

  hideApprovalDialog() {
    this.approvalDialog.visible = false;
  }
} 