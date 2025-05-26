import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';

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

@Component({
  selector: 'app-scale-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LeaderboardComponent],
  templateUrl: './scale-up.component.html',
  styleUrls: ['./scale-up.component.scss']
})
export class ScaleUpComponent implements OnInit {
  tiers: Tier[] = [];
  progress: { [tier: string]: { completed: number, total: number } } = {};
  showAllTiers: { [tier: string]: boolean } = {};
  approvalStatus: { [key: string]: 'none' | 'pending' } = {};
  approvalDialog = { message: '', visible: false };
  dialogTimeout: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
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

  toggleShowAll(tierName: string) {
    this.showAllTiers[tierName] = !this.showAllTiers[tierName];
  }

  getAchKey(tierName: string, index: number): string {
    return `${tierName}-${index}`;
  }

  approveAchievement(tierName: string, index: number) {
    const key = this.getAchKey(tierName, index);
    this.approvalStatus[key] = 'pending';
    this.showApprovalDialog('Request to approve achievement completion has been sent');
  }

  showApprovalDialog(message: string) {
    this.approvalDialog.message = message;
    this.approvalDialog.visible = true;
    if (this.dialogTimeout) clearTimeout(this.dialogTimeout);
    this.dialogTimeout = setTimeout(() => {
      this.hideApprovalDialog();
    }, 3000);
  }

  hideApprovalDialog() {
    this.approvalDialog.visible = false;
    this.approvalDialog.message = '';
    if (this.dialogTimeout) clearTimeout(this.dialogTimeout);
  }
} 