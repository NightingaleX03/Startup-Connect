import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface VCFirm {
  name: string;
  logo: string;
  location: string;
  tags: string[];
  description: string;
  portfolioSize: string;
  investmentRange: string;
  dateAdded: Date;
  email?: string;
  phone?: string;
  linkedin?: string;
}

@Component({
  selector: 'app-vc-firms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vc-firms.component.html',
  styleUrls: ['./vc-firms.component.scss']
})
export class VcFirmsComponent implements OnInit {
  searchQuery: string = '';
  sortOrder: 'newest' | 'oldest' = 'newest';
  firms: VCFirm[] = [];
  filteredFirms: VCFirm[] = [];
  selectedTags: string[] = [];
  showContactModal = false;
  selectedFirm: VCFirm | null = null;
  availableTags: string[] = [
    'AI/ML',
    'FinTech',
    'HealthTech',
    'CleanTech',
    'EdTech',
    'Enterprise SaaS',
    'Renewable Energy',
    'Sustainability',
    'Biotech',
    'Digital Health',
    'Blockchain',
    'Payments',
    'Deep Tech',
    'Robotics',
    'Quantum Computing',
    'Consumer Tech',
    'E-commerce',
    'D2C'
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Get posts from auth service
    const storedPosts = this.authService.getVcPosts();
    
    // Convert posts to firms format
    this.firms = storedPosts.map(post => ({
      name: post.title,
      logo: post.logo,
      location: post.location,
      tags: post.tags,
      description: post.description,
      portfolioSize: post.portfolioSize,
      investmentRange: post.investmentRange,
      dateAdded: new Date(post.dateAdded), // Convert string date to Date object
      email: post.email,
      phone: post.phone,
      linkedin: post.linkedin
    }));

    // Initialize filtered firms with all firms
    this.filteredFirms = [...this.firms];
    
    // Apply initial sorting
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'newest' ? 'oldest' : 'newest';
    this.applyFilters();
  }

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.firms];

    // Apply search filter - only search through titles
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(firm => 
        firm.name.toLowerCase().includes(query)
      );
    }

    // Apply tag filters
    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(firm => 
        this.selectedTags.some(tag => firm.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortOrder === 'newest') {
        return b.dateAdded.getTime() - a.dateAdded.getTime();
      } else {
        return a.dateAdded.getTime() - b.dateAdded.getTime();
      }
    });

    this.filteredFirms = filtered;
  }

  openContactModal(firm: VCFirm) {
    this.selectedFirm = firm;
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;
    this.selectedFirm = null;
  }
} 