import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  features = [
    {
      title: 'Connect with Investors',
      description: 'Find the perfect match for your startup with our advanced matching system.',
      icon: '🤝'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your startup\'s growth and get insights from industry experts.',
      icon: '📈'
    },
    {
      title: 'Network',
      description: 'Join our community of entrepreneurs and investors.',
      icon: '🌐'
    }
  ];

  testimonials = [
    {
      quote: "StartupConnect matched us with the perfect VC. The process was seamless and the community is amazing!",
      author: "Jane Doe",
      role: "Founder, TechNova",
      image: "assets/images/testimonials/jane.jpg"
    },
    {
      quote: "The AI insights helped us refine our pitch and stand out to investors.",
      author: "John Smith",
      role: "CEO, GreenFuture",
      image: "assets/images/testimonials/john.jpg"
    },
    {
      quote: "As a VC, I found high-quality startups that fit my investment thesis. Highly recommended!",
      author: "Emily Lee",
      role: "Partner, Vision Capital",
      image: "assets/images/testimonials/emily.jpg"
    }
  ];
}
