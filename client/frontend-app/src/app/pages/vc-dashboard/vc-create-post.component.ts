import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vc-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="vc-create-post-form">
      <div class="form-row">
        <img class="vc-pfp" [src]="profile.pfp" alt="Profile Picture">
        <div>
          <div class="vc-firm-name">{{ profile.firm }}</div>
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
        <input type="email" [(ngModel)]="post.email" name="email" class="form-control">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" [(ngModel)]="post.phone" name="phone" class="form-control">
      </div>
      <div class="form-group">
        <label>LinkedIn</label>
        <input type="text" [(ngModel)]="post.linkedin" name="linkedin" class="form-control">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea [(ngModel)]="post.description" name="description" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label>Portfolio Size</label>
        <input type="text" [(ngModel)]="post.portfolioSize" name="portfolioSize" class="form-control">
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
export class VcCreatePostComponent {
  profile = {
    pfp: 'https://angular.io/assets/images/logos/angular/angular.svg',
    firm: 'Angular Ventures',
    location: 'San Francisco, CA'
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
} 