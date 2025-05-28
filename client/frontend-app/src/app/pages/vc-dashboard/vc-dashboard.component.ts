import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcProfileCardComponent } from './vc-profile-card.component';
import { VcCreatePostComponent } from './vc-create-post.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface VcPost {
  logo: string;
  title: string;
  location: string;
  tags: string[];
  description: string;
  portfolioSize: string;
  investmentRange: string;
}

@Component({
  selector: 'app-vc-dashboard',
  standalone: true,
  imports: [CommonModule, VcProfileCardComponent, VcCreatePostComponent],
  templateUrl: './vc-dashboard.component.html',
  styleUrls: ['./vc-dashboard.component.scss']
})
export class VcDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.userType !== 'vc') {
      this.router.navigate(['/']);
    }
  }

  posts: VcPost[] = [];
  showModal = false;
  selectedPost: VcPost | null = null;
  applicants: string[] = [];

  ngOnInit() {
    const authProfile = this.authService.getProfile();
    if (authProfile) {
      // Create multiple posts with different focus areas and investment ranges
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