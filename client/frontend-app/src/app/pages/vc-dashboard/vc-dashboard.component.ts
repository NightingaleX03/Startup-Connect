import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcProfileCardComponent } from './vc-profile-card.component';
import { VcCreatePostComponent } from './vc-create-post.component';

@Component({
  selector: 'app-vc-dashboard',
  standalone: true,
  imports: [CommonModule, VcProfileCardComponent, VcCreatePostComponent],
  templateUrl: './vc-dashboard.component.html',
  styleUrls: ['./vc-dashboard.component.scss']
})
export class VcDashboardComponent {
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
  showModal = false;
  selectedPost: any = null;
  applicants: string[] = [];

  openApplicants(post: any) {
    this.selectedPost = post;
    // Unique sample applicants for each post
    if (post.title === 'Accel Partners') {
      this.applicants = [
        'Alpha Robotics',
        'Beta Health',
        'Gamma SaaS',
        'Delta Cloud'
      ];
    } else if (post.title === 'Sequoia Capital') {
      this.applicants = [
        'NextGen Tech',
        'Healthify',
        'ConsumerX',
        'EcoStart'
      ];
    } else if (post.title === 'Y Combinator') {
      this.applicants = [
        'Rocket Labs',
        'AccelerateAI',
        'EarlyBird',
        'StartupNest'
      ];
    } else {
      this.applicants = [
        'Startup Alpha',
        'Beta Innovations',
        'Gamma Tech',
        'Delta Startups'
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