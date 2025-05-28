import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vc-posts-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vc-posts-list-grid">
      <div class="vc-firm-card" *ngFor="let post of visiblePosts">
        <div class="firm-logo">
          <img [src]="post.logo" [alt]="post.title + ' logo'">
        </div>
        <h3 class="firm-name">{{ post.title }}</h3>
        <p class="firm-location">{{ post.location }}</p>
        <div class="firm-tags">
          <span class="tag" *ngFor="let tag of post.tags">{{ tag }}</span>
        </div>
        <p class="firm-desc">{{ post.description }}</p>
        <div class="firm-stats">
          <div class="stat">
            <span class="stat-label">Portfolio Size</span>
            <span class="stat-value">{{ post.portfolioSize }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Investment Range</span>
            <span class="stat-value">{{ post.investmentRange }}</span>
          </div>
        </div>
        <button class="contact-btn" (click)="openApplicants(post)">See list of those who applied</button>
      </div>
      <div class="modal-backdrop" *ngIf="showModal" (click)="closeModal()"></div>
      <div class="modal" *ngIf="showModal">
        <div class="modal-header">
          <span>Applicants for {{ selectedPost?.title }}</span>
          <button class="close-btn" (click)="closeModal()">&times;</button>
        </div>
        <ul class="applicants-list">
          <li *ngFor="let applicant of applicants">{{ applicant }}</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./vc-posts-list.component.scss']
})
export class VcPostsListComponent {
  posts = [
    {
      logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
      title: 'Accel Partners',
      location: 'Palo Alto, CA',
      tags: ['Technology', 'Enterprise', 'SaaS'],
      description: 'Global venture capital firm that partners with exceptional founders building category-defining companies.',
      portfolioSize: '400+',
      investmentRange: '$500K - $50M',
    },
    {
      logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
      title: 'Sequoia Capital',
      location: 'Menlo Park, CA',
      tags: ['Technology', 'Healthcare', 'Consumer'],
      description: 'One of the most successful venture capital firms, focusing on early-stage and growth-stage investments.',
      portfolioSize: '300+',
      investmentRange: '$100K - $100M',
    },
    {
      logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
      title: 'Y Combinator',
      location: 'Mountain View, CA',
      tags: ['Startups', 'Accelerator', 'Early Stage'],
      description: 'The most successful startup accelerator, helping founders build great companies.',
      portfolioSize: '2000+',
      investmentRange: '$125K - $500K',
    }
  ];
  expanded = false;
  showModal = false;
  selectedPost: any = null;
  applicants: string[] = [];

  get visiblePosts() {
    return this.expanded ? this.posts : this.posts.slice(0, 3);
  }

  openApplicants(post: any) {
    this.selectedPost = post;
    // Mock applicants list
    this.applicants = [
      'Startup Alpha',
      'Beta Innovations',
      'Gamma Tech',
      'Delta Startups'
    ];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPost = null;
    this.applicants = [];
  }
} 