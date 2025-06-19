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
  }
]; 