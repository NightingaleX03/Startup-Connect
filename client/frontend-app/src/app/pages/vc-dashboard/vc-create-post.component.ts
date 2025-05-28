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
          <option value="portfolio size">Portfolio Size</option>
          <option value="investment range">Investment Range</option>
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
  post = {
    tag: 'portfolio size',
    email: '',
    phone: '',
    linkedin: ''
  };
} 