import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-local-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="local-groups-root">
      <div class="tabs">
        <button [class.active]="activeTab === 'joined'" (click)="activeTab = 'joined'">Joined Groups</button>
        <button [class.active]="activeTab === 'find'" (click)="activeTab = 'find'">Find Groups</button>
      </div>
      <div class="tab-content-scroll">
        <div *ngIf="activeTab === 'joined'" class="joined-groups">
          <div *ngIf="joinedGroups.length === 0" class="empty-msg">You haven't joined any groups yet.</div>
          <div class="group-cards">
            <div class="group-card" *ngFor="let group of joinedGroups">
              <div class="group-title">{{ group }}</div>
              <div class="group-actions">
                <button (click)="openForum(group)">Open Forum</button>
                <button (click)="leaveGroup(group)">Leave Group</button>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="activeTab === 'find'" class="find-groups">
          <input type="text" [(ngModel)]="searchTerm" placeholder="Search groups..." class="search-bar" />
          <button class="create-btn" (click)="createGroup()">Create New Group</button>
          <div class="group-list">
            <div class="group-row" *ngFor="let group of filteredGroups()">
              <span class="group-name">{{ group }}</span>
              <button (click)="joinGroup(group)" [disabled]="joinedGroups.includes(group)">Join Group</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./local-groups.component.scss']
})
export class LocalGroupsComponent {
  allGroups: string[] = [
    "Founder's Roundtable",
    "Startup Connect",
    "The Hustle Hub",
    "Markham Entrepreneurs Unite",
    "Code & Capital",
    "Tech Titans",
    "Dev & Disrupt",
    "AI & Innovation Exchange",
    "Pitch & Fund",
    "Investor Insights",
    "Venture Visionaries",
    "Bootstrap & Beyond",
    "Scale Up Squad",
    "Traction Talks",
    "Founder Growth Lounge",
    "Expansion Experts",
    "Brand Builders",
    "Startup Storytellers",
    "Marketing Mavericks",
    "SEO & Ads Accelerator",
    "Female Founders Collective",
    "She Startup Network",
    "Women Who Build",
    "Empowered Entrepreneurs"
  ];
  joinedGroups: string[] = [
    "Startup Connect",
    "Tech Titans",
    "Founder's Roundtable"
  ];
  activeTab: 'joined' | 'find' = 'joined';
  searchTerm: string = '';

  filteredGroups(): string[] {
    return this.allGroups.filter(g =>
      !this.joinedGroups.includes(g) &&
      g.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  joinGroup(group: string) {
    if (!this.joinedGroups.includes(group)) {
      this.joinedGroups.push(group);
    }
  }

  leaveGroup(group: string) {
    this.joinedGroups = this.joinedGroups.filter(g => g !== group);
  }

  openForum(group: string) {
    alert(`Open forum for ${group}`);
  }

  createGroup() {
    const name = prompt('Enter new group name:');
    if (name && !this.allGroups.includes(name)) {
      this.allGroups.push(name);
      this.joinedGroups.push(name);
      this.activeTab = 'joined';
    }
  }
} 