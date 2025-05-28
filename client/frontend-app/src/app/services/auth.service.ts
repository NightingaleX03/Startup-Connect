// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel, SignupModel } from '../pages/auth/auth.model';

export interface User {
  userType: 'startup' | 'vc' | null;
  token: string;
}

interface TestAccount {
  password: string;
  type: 'startup' | 'vc';
  profile: any;
  wellnessScores?: {
    date: string;
    score: number;
    metrics: {
      responseTime: number;
      engagement: number;
      transparency: number;
      communication: number;
    };
  }[];
}

interface TestAccounts {
  [key: string]: TestAccount;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private testAccounts: TestAccounts = {
    'startup1': { 
      password: 'startup123', 
      type: 'startup',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechFlow',
        name: 'TechFlow',
        size: '10-50',
        location: 'San Francisco, CA',
        founded_on: '2023-01-15',
        founded_by: 'Alex Chen',
        tags: ['AI', 'Machine Learning', 'SaaS'],
        description: 'TechFlow is revolutionizing AI-powered workflow automation for enterprises. Our platform helps companies streamline their operations using cutting-edge machine learning algorithms.',
        instagram: 'techflow.ai',
        linkedin: 'techflow-ai',
        email: 'startup1@test.com',
        phone: '1234567890'
      }
    },
    'startup2': { 
      password: 'startup123', 
      type: 'startup',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LaunchPad',
        name: 'LaunchPad',
        size: '5-20',
        location: 'Seattle, WA',
        founded_on: '2023-03-15',
        founded_by: 'Michael Chen',
        tags: ['EdTech', 'AI', 'Learning Platform'],
        description: 'LaunchPad is revolutionizing education through AI-powered personalized learning platforms. We help students and professionals achieve their learning goals with adaptive technology.',
        instagram: 'launchpad.education',
        linkedin: 'launchpad-edu',
        email: 'startup2@test.com',
        phone: '1234567891',
        points: 1900,
        leaderboardPosition: 11
      }
    },
    'vc1': { 
      password: 'vc123', 
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateCapital',
        name: 'Innovate Capital',
        location: 'New York, NY',
        portfolio_size: '$500M',
        investment_range: '$1M-$10M',
        focus_areas: ['AI/ML', 'FinTech', 'HealthTech'],
        description: 'Innovate Capital is a leading venture capital firm focused on early-stage technology companies. We partner with visionary founders to build the next generation of market leaders.',
        linkedin: 'innovate-capital',
        email: 'vc1@test.com',
        phone: '1234567892'
      },
      wellnessScores: [
        {
          date: '2024-05-03',
          score: 92,
          metrics: {
            responseTime: 95,
            engagement: 90,
            transparency: 94,
            communication: 89
          }
        },
        {
          date: '2024-05-12',
          score: 88,
          metrics: {
            responseTime: 85,
            engagement: 92,
            transparency: 87,
            communication: 88
          }
        },
        {
          date: '2024-05-21',
          score: 95,
          metrics: {
            responseTime: 96,
            engagement: 94,
            transparency: 95,
            communication: 95
          }
        }
      ]
    },
    'vc2': { 
      password: 'vc123', 
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FutureVentures',
        name: 'Future Ventures',
        location: 'Boston, MA',
        portfolio_size: '$300M',
        investment_range: '$500K-$5M',
        focus_areas: ['CleanTech', 'EdTech', 'Enterprise SaaS'],
        description: 'Future Ventures invests in transformative companies that are shaping the future. We focus on sustainable technology and education innovation.',
        linkedin: 'future-ventures',
        email: 'vc2@test.com',
        phone: '1234567893'
      },
      wellnessScores: [
        {
          date: '2024-05-05',
          score: 85,
          metrics: {
            responseTime: 82,
            engagement: 88,
            transparency: 84,
            communication: 86
          }
        },
        {
          date: '2024-05-15',
          score: 91,
          metrics: {
            responseTime: 89,
            engagement: 93,
            transparency: 90,
            communication: 92
          }
        },
        {
          date: '2024-05-25',
          score: 87,
          metrics: {
            responseTime: 85,
            engagement: 89,
            transparency: 86,
            communication: 88
          }
        }
      ]
    },
    'vc3': {
      password: 'vc123',
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechVentures',
        name: 'TechVentures Capital',
        location: 'San Francisco, CA',
        portfolio_size: '$750M',
        investment_range: '$2M-$20M',
        focus_areas: ['AI/ML', 'Cloud Computing', 'Enterprise Software'],
        description: 'TechVentures Capital is a premier venture capital firm investing in cutting-edge technology companies. We focus on AI, cloud infrastructure, and enterprise software solutions.',
        linkedin: 'techventures-capital',
        email: 'contact@techventures.com',
        phone: '415-555-0101'
      },
      wellnessScores: [
        {
          date: '2024-05-02',
          score: 94,
          metrics: {
            responseTime: 95,
            engagement: 93,
            transparency: 94,
            communication: 94
          }
        },
        {
          date: '2024-05-14',
          score: 96,
          metrics: {
            responseTime: 97,
            engagement: 95,
            transparency: 96,
            communication: 96
          }
        },
        {
          date: '2024-05-28',
          score: 93,
          metrics: {
            responseTime: 92,
            engagement: 94,
            transparency: 93,
            communication: 93
          }
        }
      ]
    },
    'vc4': {
      password: 'vc123',
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenGrowth',
        name: 'GreenGrowth Ventures',
        location: 'Austin, TX',
        portfolio_size: '$400M',
        investment_range: '$1M-$15M',
        focus_areas: ['CleanTech', 'Renewable Energy', 'Sustainability'],
        description: 'GreenGrowth Ventures is dedicated to accelerating the transition to a sustainable future. We invest in innovative clean technology and renewable energy solutions.',
        linkedin: 'greengrowth-ventures',
        email: 'invest@greengrowth.vc',
        phone: '512-555-0202'
      },
      wellnessScores: [
        {
          date: '2024-05-04',
          score: 89,
          metrics: {
            responseTime: 87,
            engagement: 91,
            transparency: 88,
            communication: 90
          }
        },
        {
          date: '2024-05-17',
          score: 92,
          metrics: {
            responseTime: 90,
            engagement: 93,
            transparency: 91,
            communication: 94
          }
        },
        {
          date: '2024-05-26',
          score: 90,
          metrics: {
            responseTime: 88,
            engagement: 92,
            transparency: 89,
            communication: 91
          }
        }
      ]
    },
    'vc5': {
      password: 'vc123',
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HealthInnovate',
        name: 'HealthInnovate Partners',
        location: 'Boston, MA',
        portfolio_size: '$600M',
        investment_range: '$3M-$25M',
        focus_areas: ['HealthTech', 'Biotech', 'Digital Health'],
        description: 'HealthInnovate Partners is a specialized healthcare venture capital firm. We invest in breakthrough medical technologies and digital health solutions.',
        linkedin: 'healthinnovate-partners',
        email: 'partners@healthinnovate.com',
        phone: '617-555-0303'
      },
      wellnessScores: [
        {
          date: '2024-05-06',
          score: 93,
          metrics: {
            responseTime: 91,
            engagement: 95,
            transparency: 92,
            communication: 94
          }
        },
        {
          date: '2024-05-19',
          score: 95,
          metrics: {
            responseTime: 94,
            engagement: 96,
            transparency: 95,
            communication: 95
          }
        },
        {
          date: '2024-05-29',
          score: 94,
          metrics: {
            responseTime: 93,
            engagement: 95,
            transparency: 94,
            communication: 94
          }
        }
      ]
    },
    'vc6': {
      password: 'vc123',
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FinTechVentures',
        name: 'FinTech Ventures',
        location: 'London, UK',
        portfolio_size: '$800M',
        investment_range: '$1M-$30M',
        focus_areas: ['FinTech', 'Blockchain', 'Payments'],
        description: 'FinTech Ventures is a global venture capital firm focused on financial technology innovation. We invest in disruptive fintech startups transforming the financial industry.',
        linkedin: 'fintech-ventures',
        email: 'info@fintechventures.com',
        phone: '+44-20-555-0404'
      },
      wellnessScores: [
        {
          date: '2024-05-07',
          score: 91,
          metrics: {
            responseTime: 89,
            engagement: 93,
            transparency: 90,
            communication: 92
          }
        },
        {
          date: '2024-05-16',
          score: 94,
          metrics: {
            responseTime: 92,
            engagement: 95,
            transparency: 93,
            communication: 96
          }
        },
        {
          date: '2024-05-27',
          score: 92,
          metrics: {
            responseTime: 90,
            engagement: 94,
            transparency: 91,
            communication: 93
          }
        }
      ]
    },
    'vc7': {
      password: 'vc123',
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeepTech',
        name: 'DeepTech Capital',
        location: 'Seattle, WA',
        portfolio_size: '$450M',
        investment_range: '$2M-$20M',
        focus_areas: ['Deep Tech', 'Robotics', 'Quantum Computing'],
        description: 'DeepTech Capital invests in breakthrough deep technology companies. We focus on robotics, quantum computing, and other frontier technologies.',
        linkedin: 'deeptech-capital',
        email: 'hello@deeptech.capital',
        phone: '206-555-0505'
      },
      wellnessScores: [
        {
          date: '2024-05-08',
          score: 88,
          metrics: {
            responseTime: 86,
            engagement: 90,
            transparency: 87,
            communication: 89
          }
        },
        {
          date: '2024-05-18',
          score: 90,
          metrics: {
            responseTime: 88,
            engagement: 92,
            transparency: 89,
            communication: 91
          }
        },
        {
          date: '2024-05-30',
          score: 89,
          metrics: {
            responseTime: 87,
            engagement: 91,
            transparency: 88,
            communication: 90
          }
        }
      ]
    },
    'vc8': {
      password: 'vc123',
      type: 'vc',
      profile: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ConsumerVentures',
        name: 'Consumer Ventures',
        location: 'Los Angeles, CA',
        portfolio_size: '$350M',
        investment_range: '$500K-$10M',
        focus_areas: ['Consumer Tech', 'E-commerce', 'D2C'],
        description: 'Consumer Ventures specializes in consumer technology and direct-to-consumer brands. We help build the next generation of consumer-focused companies.',
        linkedin: 'consumer-ventures',
        email: 'invest@consumer.ventures',
        phone: '323-555-0606'
      },
      wellnessScores: [
        {
          date: '2024-05-09',
          score: 86,
          metrics: {
            responseTime: 84,
            engagement: 88,
            transparency: 85,
            communication: 87
          }
        },
        {
          date: '2024-05-20',
          score: 89,
          metrics: {
            responseTime: 87,
            engagement: 91,
            transparency: 88,
            communication: 90
          }
        },
        {
          date: '2024-05-31',
          score: 87,
          metrics: {
            responseTime: 85,
            engagement: 89,
            transparency: 86,
            communication: 88
          }
        }
      ]
    }
  };

  private vcPosts: any[] = [
    // Innovate Capital posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateCapital',
      title: 'Innovate Capital - Early Stage',
      location: 'New York, NY',
      tags: ['AI/ML', 'FinTech', 'HealthTech'],
      description: 'Innovate Capital is a leading venture capital firm focused on early-stage technology companies. We partner with visionary founders to build the next generation of market leaders.',
      portfolioSize: '$500M',
      investmentRange: '$1M-$10M',
      email: 'vc1@test.com',
      phone: '1234567892',
      linkedin: 'innovate-capital',
      dateAdded: '2024-03-15'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateCapital',
      title: 'Innovate Capital - Growth Stage',
      location: 'New York, NY',
      tags: ['AI/ML', 'FinTech', 'HealthTech'],
      description: 'Innovate Capital is a leading venture capital firm focused on growth-stage technology companies. We help scale innovative businesses to their full potential.',
      portfolioSize: '$500M',
      investmentRange: '$10M-$50M',
      email: 'vc1@test.com',
      phone: '1234567892',
      linkedin: 'innovate-capital',
      dateAdded: '2024-03-10'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateCapital',
      title: 'Innovate Capital - Seed Fund',
      location: 'New York, NY',
      tags: ['AI/ML', 'FinTech', 'HealthTech'],
      description: 'Our seed fund supports innovative startups at their earliest stages. We provide capital and mentorship to help founders turn their vision into reality.',
      portfolioSize: '$500M',
      investmentRange: '$250K-$1M',
      email: 'vc1@test.com',
      phone: '1234567892',
      linkedin: 'innovate-capital',
      dateAdded: '2024-03-05'
    },
    // Future Ventures posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FutureVentures',
      title: 'Future Ventures - CleanTech',
      location: 'Boston, MA',
      tags: ['CleanTech', 'EdTech', 'Enterprise SaaS'],
      description: 'Future Ventures invests in transformative companies that are shaping the future. We focus on sustainable technology and education innovation.',
      portfolioSize: '$300M',
      investmentRange: '$500K-$5M',
      email: 'vc2@test.com',
      phone: '1234567893',
      linkedin: 'future-ventures',
      dateAdded: '2024-03-14'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FutureVentures',
      title: 'Future Ventures - EdTech',
      location: 'Boston, MA',
      tags: ['EdTech', 'CleanTech', 'Enterprise SaaS'],
      description: 'Future Ventures is dedicated to revolutionizing education through technology. We invest in innovative EdTech solutions that transform learning experiences.',
      portfolioSize: '$300M',
      investmentRange: '$500K-$5M',
      email: 'vc2@test.com',
      phone: '1234567893',
      linkedin: 'future-ventures',
      dateAdded: '2024-03-09'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FutureVentures',
      title: 'Future Ventures - Enterprise SaaS',
      location: 'Boston, MA',
      tags: ['Enterprise SaaS', 'EdTech', 'CleanTech'],
      description: 'Our Enterprise SaaS fund focuses on B2B software solutions that drive efficiency and innovation in large organizations.',
      portfolioSize: '$300M',
      investmentRange: '$1M-$10M',
      email: 'vc2@test.com',
      phone: '1234567893',
      linkedin: 'future-ventures',
      dateAdded: '2024-03-04'
    },
    // TechVentures Capital posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechVentures',
      title: 'TechVentures Capital - AI/ML Fund',
      location: 'San Francisco, CA',
      tags: ['AI/ML', 'Cloud Computing', 'Enterprise Software'],
      description: 'TechVentures Capital is a premier venture capital firm investing in cutting-edge technology companies. We focus on AI, cloud infrastructure, and enterprise software solutions.',
      portfolioSize: '$750M',
      investmentRange: '$2M-$20M',
      email: 'contact@techventures.com',
      phone: '415-555-0101',
      linkedin: 'techventures-capital',
      dateAdded: '2024-03-13'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechVentures',
      title: 'TechVentures Capital - Cloud Infrastructure',
      location: 'San Francisco, CA',
      tags: ['Cloud Computing', 'AI/ML', 'Enterprise Software'],
      description: 'Our Cloud Infrastructure fund invests in companies building the next generation of cloud computing platforms and services.',
      portfolioSize: '$750M',
      investmentRange: '$3M-$25M',
      email: 'contact@techventures.com',
      phone: '415-555-0101',
      linkedin: 'techventures-capital',
      dateAdded: '2024-03-08'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechVentures',
      title: 'TechVentures Capital - Enterprise Software',
      location: 'San Francisco, CA',
      tags: ['Enterprise Software', 'AI/ML', 'Cloud Computing'],
      description: 'We invest in enterprise software companies that are transforming how businesses operate and compete in the digital age.',
      portfolioSize: '$750M',
      investmentRange: '$2M-$20M',
      email: 'contact@techventures.com',
      phone: '415-555-0101',
      linkedin: 'techventures-capital',
      dateAdded: '2024-03-03'
    },
    // GreenGrowth Ventures posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenGrowth',
      title: 'GreenGrowth Ventures - CleanTech',
      location: 'Austin, TX',
      tags: ['CleanTech', 'Renewable Energy', 'Sustainability'],
      description: 'GreenGrowth Ventures is dedicated to accelerating the transition to a sustainable future. We invest in innovative clean technology and renewable energy solutions.',
      portfolioSize: '$400M',
      investmentRange: '$1M-$15M',
      email: 'invest@greengrowth.vc',
      phone: '512-555-0202',
      linkedin: 'greengrowth-ventures',
      dateAdded: '2024-03-12'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenGrowth',
      title: 'GreenGrowth Ventures - Renewable Energy',
      location: 'Austin, TX',
      tags: ['Renewable Energy', 'CleanTech', 'Sustainability'],
      description: 'Our Renewable Energy fund focuses on breakthrough technologies in solar, wind, and other renewable energy sources.',
      portfolioSize: '$400M',
      investmentRange: '$2M-$20M',
      email: 'invest@greengrowth.vc',
      phone: '512-555-0202',
      linkedin: 'greengrowth-ventures',
      dateAdded: '2024-03-07'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenGrowth',
      title: 'GreenGrowth Ventures - Sustainability',
      location: 'Austin, TX',
      tags: ['Sustainability', 'CleanTech', 'Renewable Energy'],
      description: 'We invest in companies developing innovative solutions for environmental sustainability and climate change mitigation.',
      portfolioSize: '$400M',
      investmentRange: '$1M-$15M',
      email: 'invest@greengrowth.vc',
      phone: '512-555-0202',
      linkedin: 'greengrowth-ventures',
      dateAdded: '2024-03-02'
    },
    // HealthInnovate Partners posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HealthInnovate',
      title: 'HealthInnovate Partners - HealthTech',
      location: 'Boston, MA',
      tags: ['HealthTech', 'Biotech', 'Digital Health'],
      description: 'HealthInnovate Partners is a specialized healthcare venture capital firm. We invest in breakthrough medical technologies and digital health solutions.',
      portfolioSize: '$600M',
      investmentRange: '$3M-$25M',
      email: 'partners@healthinnovate.com',
      phone: '617-555-0303',
      linkedin: 'healthinnovate-partners',
      dateAdded: '2024-03-11'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HealthInnovate',
      title: 'HealthInnovate Partners - Biotech',
      location: 'Boston, MA',
      tags: ['Biotech', 'HealthTech', 'Digital Health'],
      description: 'Our Biotech fund invests in revolutionary medical research and therapeutic development companies.',
      portfolioSize: '$600M',
      investmentRange: '$5M-$30M',
      email: 'partners@healthinnovate.com',
      phone: '617-555-0303',
      linkedin: 'healthinnovate-partners',
      dateAdded: '2024-03-06'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HealthInnovate',
      title: 'HealthInnovate Partners - Digital Health',
      location: 'Boston, MA',
      tags: ['Digital Health', 'HealthTech', 'Biotech'],
      description: 'We invest in digital health companies that are transforming healthcare delivery and patient care through technology.',
      portfolioSize: '$600M',
      investmentRange: '$2M-$20M',
      email: 'partners@healthinnovate.com',
      phone: '617-555-0303',
      linkedin: 'healthinnovate-partners',
      dateAdded: '2024-03-01'
    },
    // FinTech Ventures posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FinTechVentures',
      title: 'FinTech Ventures - Core FinTech',
      location: 'London, UK',
      tags: ['FinTech', 'Blockchain', 'Payments'],
      description: 'FinTech Ventures is a global venture capital firm focused on financial technology innovation. We invest in disruptive fintech startups transforming the financial industry.',
      portfolioSize: '$800M',
      investmentRange: '$1M-$30M',
      email: 'info@fintechventures.com',
      phone: '+44-20-555-0404',
      linkedin: 'fintech-ventures',
      dateAdded: '2024-02-15'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FinTechVentures',
      title: 'FinTech Ventures - Blockchain',
      location: 'London, UK',
      tags: ['Blockchain', 'FinTech', 'Payments'],
      description: 'Our Blockchain fund invests in companies developing innovative blockchain solutions for financial services and beyond.',
      portfolioSize: '$800M',
      investmentRange: '$2M-$25M',
      email: 'info@fintechventures.com',
      phone: '+44-20-555-0404',
      linkedin: 'fintech-ventures',
      dateAdded: '2024-02-10'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FinTechVentures',
      title: 'FinTech Ventures - Payments',
      location: 'London, UK',
      tags: ['Payments', 'FinTech', 'Blockchain'],
      description: 'We invest in companies revolutionizing payment systems and financial transactions through innovative technology.',
      portfolioSize: '$800M',
      investmentRange: '$1M-$20M',
      email: 'info@fintechventures.com',
      phone: '+44-20-555-0404',
      linkedin: 'fintech-ventures',
      dateAdded: '2024-02-05'
    },
    // DeepTech Capital posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeepTech',
      title: 'DeepTech Capital - Robotics',
      location: 'Seattle, WA',
      tags: ['Deep Tech', 'Robotics', 'Quantum Computing'],
      description: 'DeepTech Capital invests in breakthrough deep technology companies. We focus on robotics, quantum computing, and other frontier technologies.',
      portfolioSize: '$450M',
      investmentRange: '$2M-$20M',
      email: 'hello@deeptech.capital',
      phone: '206-555-0505',
      linkedin: 'deeptech-capital',
      dateAdded: '2024-02-20'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeepTech',
      title: 'DeepTech Capital - Quantum Computing',
      location: 'Seattle, WA',
      tags: ['Quantum Computing', 'Deep Tech', 'Robotics'],
      description: 'Our Quantum Computing fund invests in companies developing next-generation quantum computing technologies and applications.',
      portfolioSize: '$450M',
      investmentRange: '$3M-$25M',
      email: 'hello@deeptech.capital',
      phone: '206-555-0505',
      linkedin: 'deeptech-capital',
      dateAdded: '2024-02-12'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeepTech',
      title: 'DeepTech Capital - Frontier Tech',
      location: 'Seattle, WA',
      tags: ['Deep Tech', 'Robotics', 'Quantum Computing'],
      description: 'We invest in companies pushing the boundaries of technology with breakthrough innovations in deep tech.',
      portfolioSize: '$450M',
      investmentRange: '$2M-$20M',
      email: 'hello@deeptech.capital',
      phone: '206-555-0505',
      linkedin: 'deeptech-capital',
      dateAdded: '2024-02-08'
    },
    // Consumer Ventures posts
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ConsumerVentures',
      title: 'Consumer Ventures - D2C',
      location: 'Los Angeles, CA',
      tags: ['Consumer Tech', 'E-commerce', 'D2C'],
      description: 'Consumer Ventures specializes in consumer technology and direct-to-consumer brands. We help build the next generation of consumer-focused companies.',
      portfolioSize: '$350M',
      investmentRange: '$500K-$10M',
      email: 'invest@consumer.ventures',
      phone: '323-555-0606',
      linkedin: 'consumer-ventures',
      dateAdded: '2024-02-18'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ConsumerVentures',
      title: 'Consumer Ventures - E-commerce',
      location: 'Los Angeles, CA',
      tags: ['E-commerce', 'Consumer Tech', 'D2C'],
      description: 'Our E-commerce fund invests in companies revolutionizing online retail and digital commerce experiences.',
      portfolioSize: '$350M',
      investmentRange: '$1M-$15M',
      email: 'invest@consumer.ventures',
      phone: '323-555-0606',
      linkedin: 'consumer-ventures',
      dateAdded: '2024-02-14'
    },
    {
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ConsumerVentures',
      title: 'Consumer Ventures - Consumer Tech',
      location: 'Los Angeles, CA',
      tags: ['Consumer Tech', 'E-commerce', 'D2C'],
      description: 'We invest in consumer technology companies that are transforming how people live, work, and play.',
      portfolioSize: '$350M',
      investmentRange: '$500K-$10M',
      email: 'invest@consumer.ventures',
      phone: '323-555-0606',
      linkedin: 'consumer-ventures',
      dateAdded: '2024-02-07'
    }
  ];

  constructor(private router: Router) {}

  clearAuthData(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');  
  }

  login(user: LoginModel): Observable<any> {
    const account = this.testAccounts[user.name];
    if (account && account.password === user.password) {
      const response = {
        username: user.name,
        userType: account.type,
        token: 'test-token',
        profile: account.profile
      };
      localStorage.setItem('currentUser', JSON.stringify(response));
      return of(response);
    }
    return of({ error: 'Invalid username or password' });
  }

  signup(user: SignupModel): Observable<any> {
    return of({ message: 'Signup successful' });
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getUserType(): 'startup' | 'vc' | null {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.userType || null;
  }

  getProfile(): any {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.profile || null;
  }

  storeVcPost(post: any) {
    this.vcPosts.push(post);
  }

  getVcPosts() {
    // Return a copy of the posts array to prevent modifications
    return [...this.vcPosts];
  }
}
