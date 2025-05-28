import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface VcPost {
  logo: string;
  title: string;
  location: string;
  tags: string[];
  description: string;
  portfolioSize: string;
  investmentRange: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

@Component({
  selector: 'app-vc-posts-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vc-posts-list-section">
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
export class VcPostsListComponent implements OnInit {
  posts: VcPost[] = [];
  expanded = false;
  showModal = false;
  selectedPost: VcPost | null = null;
  applicants: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Get stored posts from auth service
    const storedPosts = this.authService.getVcPosts();
    
    if (storedPosts.length > 0) {
      // Use stored posts if available
      this.posts = storedPosts;
    } else {
      // Fallback to default posts if no stored posts
      const authProfile = this.authService.getProfile();
      if (authProfile) {
        this.posts = [
          {
            logo: authProfile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=VC',
            title: `${authProfile.name} - Early Stage`,
            location: authProfile.location || 'Set your location',
            tags: ['Early Stage', 'Seed', 'Pre-Seed'],
            description: `${authProfile.description || 'Add a description of your VC firm'} - Early Stage Fund`,
            portfolioSize: authProfile.portfolio_size || 'Add portfolio size',
            investmentRange: '$100K - $1M',
          },
          {
            logo: authProfile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=VC',
            title: `${authProfile.name} - Growth Stage`,
            location: authProfile.location || 'Set your location',
            tags: ['Growth', 'Series A', 'Series B'],
            description: `${authProfile.description || 'Add a description of your VC firm'} - Growth Stage Fund`,
            portfolioSize: authProfile.portfolio_size || 'Add portfolio size',
            investmentRange: '$1M - $10M',
          },
          {
            logo: authProfile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=VC',
            title: `${authProfile.name} - Specialized Fund`,
            location: authProfile.location || 'Set your location',
            tags: authProfile.focus_areas || ['Add focus areas'],
            description: `${authProfile.description || 'Add a description of your VC firm'} - Specialized Investment Fund`,
            portfolioSize: authProfile.portfolio_size || 'Add portfolio size',
            investmentRange: authProfile.investment_range || 'Add investment range',
          }
        ];
      }
    }
  }

  get visiblePosts() {
    return this.expanded ? this.posts : this.posts.slice(0, 3);
  }

  openApplicants(post: VcPost) {
    this.selectedPost = post;
    // Generate different applicants based on the post type
    if (post.title.includes('Early Stage')) {
      this.applicants = [
        'SeedStart',
        'PreSeed Ventures',
        'EarlyBird Tech',
        'FirstRound Founders'
      ];
    } else if (post.title.includes('Growth Stage')) {
      this.applicants = [
        'GrowthTech',
        'ScaleUp Solutions',
        'SeriesA Ventures',
        'Expansion Labs'
      ];
    } else {
      this.applicants = [
        'Specialized Startup',
        'Niche Innovators',
        'Domain Experts',
        'Industry Leaders'
      ];
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPost = null;
    this.applicants = [];
  }
} 