import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blogPosts = [
    {
      title: 'The Future of Startup Funding',
      excerpt: 'Exploring how AI and machine learning are revolutionizing the way startups connect with investors.',
      category: 'Funding',
      date: 'March 15, 2024',
      image: 'assets/images/blog/funding.jpg',
      slug: 'future-of-startup-funding'
    },
    {
      title: 'Building a Strong Startup Community',
      excerpt: 'Learn how to create and nurture a thriving community around your startup.',
      category: 'Community',
      date: 'March 10, 2024',
      image: 'assets/images/blog/community.jpg',
      slug: 'building-strong-startup-community'
    },
    {
      title: 'AI-Powered Matchmaking for Startups',
      excerpt: 'How our platform uses AI to create perfect matches between startups and investors.',
      category: 'Technology',
      date: 'March 5, 2024',
      image: 'assets/images/blog/ai-matchmaking.jpg',
      slug: 'ai-powered-matchmaking'
    }
  ];
} 