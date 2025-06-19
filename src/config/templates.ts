import { Block } from '@/types/blocks';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'transactional' | 'newsletter';
  thumbnail?: string;
  blocks: Block[];
}

export const templates: Template[] = [
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    description: 'A friendly welcome message for new users',
    category: 'transactional',
    blocks: [
      {
        id: 'header-text',
        type: 'text',
        props: {
          text: 'Welcome to Our Service! 👋',
          fontSize: '24px',
          color: '#1f2937',
          textAlign: 'center'
        }
      },
      {
        id: 'welcome-message',
        type: 'text',
        props: {
          text: "We're excited to have you on board. Here's what you can expect from us...",
          fontSize: '16px',
          color: '#4b5563',
          textAlign: 'left'
        }
      },
      {
        id: 'divider-1',
        type: 'divider',
        props: {
          color: '#e5e7eb',
          height: '1px',
          margin: '20px 0'
        }
      },
      {
        id: 'features-list',
        type: 'list',
        props: {
          items: [
            'Access to all premium features',
            'Weekly newsletter with tips and tricks',
            '24/7 customer support'
          ],
          listType: 'unordered',
          fontSize: '16px',
          color: '#4b5563',
          bulletColor: '#3b82f6',
          spacing: '0.75em',
          textAlign: 'left'
        }
      },
      {
        id: 'cta-button',
        type: 'button',
        props: {
          text: 'Get Started',
          href: '#',
          fontSize: '16px',
          color: '#ffffff',
          backgroundColor: '#3b82f6',
          padding: '12px 24px',
          borderRadius: '6px',
          textAlign: 'center'
        }
      }
    ]
  },
  {
    id: 'newsletter',
    name: 'Monthly Newsletter',
    description: 'A clean and modern newsletter template',
    category: 'newsletter',
    blocks: [
      {
        id: 'newsletter-header',
        type: 'text',
        props: {
          text: 'Monthly Updates 📰',
          fontSize: '28px',
          color: '#1f2937',
          textAlign: 'center'
        }
      },
      {
        id: 'newsletter-intro',
        type: 'text',
        props: {
          text: 'Here are the latest updates and news from our team...',
          fontSize: '16px',
          color: '#4b5563',
          textAlign: 'left'
        }
      },
      {
        id: 'divider-2',
        type: 'divider',
        props: {
          color: '#e5e7eb',
          height: '2px',
          margin: '24px 0'
        }
      },
      {
        id: 'featured-image',
        type: 'image',
        props: {
          src: 'https://via.placeholder.com/600x300',
          alt: 'Featured story image',
          width: '100%',
          height: 'auto'
        }
      },
      {
        id: 'read-more-button',
        type: 'button',
        props: {
          text: 'Read Full Story',
          href: '#',
          fontSize: '16px',
          color: '#ffffff',
          backgroundColor: '#3b82f6',
          padding: '12px 24px',
          borderRadius: '6px',
          textAlign: 'center'
        }
      }
    ]
  },
  {
    id: 'modern-promo',
    name: 'Modern Promotion',
    description: 'A sleek and engaging promotional template with modern design elements',
    category: 'marketing',
    blocks: [
      {
        id: 'hero-container',
        type: 'container',
        props: {
          backgroundColor: '#f8fafc',
          padding: '40px 20px'
        }
      },
      {
        id: 'logo-text',
        type: 'text',
        props: {
          text: '🚀 SuperApp',
          fontSize: '32px',
          color: '#0f172a',
          textAlign: 'center',
          lineHeight: '1.2'
        }
      },
      {
        id: 'hero-spacer',
        type: 'spacer',
        props: {
          height: '30px'
        }
      },
      {
        id: 'hero-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          alt: 'Modern workspace with laptop',
          width: '100%',
          height: 'auto',
          borderRadius: '16px'
        }
      },
      {
        id: 'image-spacer',
        type: 'spacer',
        props: {
          height: '40px'
        }
      },
      {
        id: 'headline',
        type: 'text',
        props: {
          text: 'Transform Your Workflow Today',
          fontSize: '36px',
          color: '#1e293b',
          textAlign: 'center',
          lineHeight: '1.2'
        }
      },
      {
        id: 'subheadline',
        type: 'text',
        props: {
          text: 'Experience the future of productivity with our latest features',
          fontSize: '18px',
          color: '#64748b',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      {
        id: 'text-spacer',
        type: 'spacer',
        props: {
          height: '30px'
        }
      },
      {
        id: 'features-list',
        type: 'list',
        props: {
          items: [
            '🎯 Smart task automation',
            '🔄 Real-time collaboration',
            '📊 Advanced analytics dashboard',
            '🛡️ Enterprise-grade security'
          ],
          listType: 'unordered',
          fontSize: '16px',
          color: '#334155',
          bulletColor: '#3b82f6',
          spacing: '1em',
          textAlign: 'center'
        }
      },
      {
        id: 'list-spacer',
        type: 'spacer',
        props: {
          height: '40px'
        }
      },
      {
        id: 'cta-button',
        type: 'button',
        props: {
          text: 'Get Started Free',
          href: '#',
          fontSize: '18px',
          color: '#ffffff',
          backgroundColor: '#3b82f6',
          padding: '16px 32px',
          borderRadius: '8px',
          align: 'center'
        }
      },
      {
        id: 'button-spacer',
        type: 'spacer',
        props: {
          height: '40px'
        }
      },
      {
        id: 'divider',
        type: 'divider',
        props: {
          color: '#e2e8f0',
          height: '2px',
          width: '80%'
        }
      },
      {
        id: 'footer-spacer',
        type: 'spacer',
        props: {
          height: '30px'
        }
      },
      {
        id: 'social-links',
        type: 'social',
        props: {
          networks: [
            { platform: 'twitter', url: 'https://twitter.com' },
            { platform: 'linkedin', url: 'https://linkedin.com' },
            { platform: 'instagram', url: 'https://instagram.com' }
          ],
          iconSize: '24px',
          spacing: '20px',
          alignment: 'center'
        }
      },
      {
        id: 'footer-text',
        type: 'text',
        props: {
          text: '© 2024 SuperApp. All rights reserved.',
          fontSize: '14px',
          color: '#94a3b8',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      }
    ]
  }
]; 