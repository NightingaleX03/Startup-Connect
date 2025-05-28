import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vc-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="vc-create-post-form" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <img class="vc-pfp" [src]="profile.avatar" alt="Profile Picture">
        <div>
          <div class="vc-firm-name">{{ profile.name }}</div>
          <div class="vc-location">{{ profile.location }}</div>
        </div>
      </div>
      <div class="form-group">
        <label>Tags</label>
        <select [(ngModel)]="post.tag" name="tag" class="form-control">
          <option *ngFor="let option of tagOptions" [value]="option">{{ option }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" [(ngModel)]="post.email" name="email" class="form-control" [value]="profile.email">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" [(ngModel)]="post.phone" name="phone" class="form-control" [value]="profile.phone">
      </div>
      <div class="form-group">
        <label>LinkedIn</label>
        <input type="text" [(ngModel)]="post.linkedin" name="linkedin" class="form-control" [value]="profile.linkedin">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea [(ngModel)]="post.description" name="description" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label>Portfolio Size</label>
        <input type="text" [(ngModel)]="post.portfolioSize" name="portfolioSize" class="form-control" [value]="profile.portfolio_size">
      </div>
      <div class="form-group">
        <label>Investment Range (Min)</label>
        <input type="text" [(ngModel)]="post.investmentMin" name="investmentMin" class="form-control">
      </div>
      <div class="form-group">
        <label>Investment Range (Max)</label>
        <input type="text" [(ngModel)]="post.investmentMax" name="investmentMax" class="form-control">
      </div>
      <button type="submit" class="btn">Create Post</button>
    </form>
  `,
  styleUrls: ['./vc-create-post.component.scss']
})
export class VcCreatePostComponent implements OnInit {
  profile = {
    avatar: '',
    name: '',
    location: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio_size: '',
    investment_range: ''
  };

  tagOptions = [
    'Technology',
    'Healthcare',
    'Consumer',
    'Software',
    'Fintech',
    'Crypto',
    'Startups',
    'Accelerator',
    'Early Stage'
  ];

  post = {
    tag: 'Technology',
    email: '',
    phone: '',
    linkedin: '',
    description: '',
    portfolioSize: '',
    investmentMin: '',
    investmentMax: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const authProfile = this.authService.getProfile();
    if (authProfile) {
      this.profile = {
        avatar: authProfile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=VC',
        name: authProfile.name || 'VC Firm',
        location: authProfile.location || 'Set your location',
        email: authProfile.email || '',
        phone: authProfile.phone || '',
        linkedin: authProfile.linkedin || '',
        portfolio_size: authProfile.portfolio_size || '',
        investment_range: authProfile.investment_range || ''
      };

      // Pre-fill the post form with profile data
      this.post = {
        ...this.post,
        email: this.profile.email,
        phone: this.profile.phone,
        linkedin: this.profile.linkedin,
        portfolioSize: this.profile.portfolio_size
      };
    }
  }

  onSubmit() {
    // Create a new post object with the form data
    const newPost = {
      logo: this.profile.avatar,
      title: `${this.profile.name} - ${this.post.tag}`,
      location: this.profile.location,
      tags: [this.post.tag],
      description: this.post.description,
      portfolioSize: this.post.portfolioSize,
      investmentRange: `$${this.post.investmentMin}K - $${this.post.investmentMax}M`,
      email: this.post.email,
      phone: this.post.phone,
      linkedin: this.post.linkedin
    };

    // Store the post in the auth service
    this.authService.storeVcPost(newPost);

    // Reset the form
    this.post = {
      tag: 'Technology',
      email: this.profile.email,
      phone: this.profile.phone,
      linkedin: this.profile.linkedin,
      description: '',
      portfolioSize: this.profile.portfolio_size,
      investmentMin: '',
      investmentMax: ''
    };
  }
} 