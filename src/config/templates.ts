import { Block } from '@/types/blocks';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'transactional' | 'newsletter';
  blocks: Block[];
}

export const templates: Template[] = [
  {
    id: 'minimal-welcome',
    name: 'Minimal Welcome',
    description: 'A clean, modern welcome email with minimalist design',
    category: 'transactional',
    blocks: [
      {
        id: 'logo',
        type: 'text',
        props: {
          text: '⚡️ SuperApp',
          fontSize: '24px',
          color: '#000000',
          textAlign: 'center',
          fontWeight: '600',
          paddingTop: '48px',
          paddingBottom: '48px'
        }
      },
      {
        id: 'welcome-heading',
        type: 'text',
        props: {
          text: 'Welcome aboard!',
          fontSize: '36px',
          color: '#000000',
          textAlign: 'center',
          fontWeight: '700',
          lineHeight: '1.2',
          paddingBottom: '16px'
        }
      },
      {
        id: 'welcome-subheading',
        type: 'text',
        props: {
          text: "We're excited to have you with us.",
          fontSize: '18px',
          color: '#666666',
          textAlign: 'center',
          lineHeight: '1.6',
          paddingBottom: '32px'
        }
      },
      {
        id: 'cta-button',
        type: 'button',
        props: {
          text: 'Get Started →',
          href: '#',
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: '32px',
          paddingX: '32px',
          paddingY: '16px',
          fontSize: '16px',
          fontWeight: '500',
          alignment: 'center'
        }
      },
      {
        id: 'features-spacer',
        type: 'spacer',
        props: {
          height: '48px'
        }
      },
      {
        id: 'features-list',
        type: 'list',
        props: {
          items: [
            'Access to all premium features',
            'Personalized onboarding session',
            '24/7 priority support'
          ],
          listType: 'unordered',
          fontSize: '16px',
          color: '#666666',
          bulletColor: '#000000',
          spacing: '16px',
          textAlign: 'center'
        }
      }
    ]
  },
  {
    id: 'modern-newsletter',
    name: 'Modern Newsletter',
    description: 'A contemporary newsletter design with bold typography',
    category: 'newsletter',
    blocks: [
      {
        id: 'header-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
          alt: 'Team collaboration',
          width: '100%',
          height: 'auto',
          borderRadius: '16px'
        }
      },
      {
        id: 'header-spacer',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'date',
        type: 'text',
        props: {
          text: 'April 2024',
          fontSize: '14px',
          color: '#666666',
          textAlign: 'left',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          paddingBottom: '16px'
        }
      },
      {
        id: 'title',
        type: 'text',
        props: {
          text: 'Revolutionizing How Teams Work Together',
          fontSize: '32px',
          color: '#000000',
          textAlign: 'left',
          fontWeight: '700',
          lineHeight: '1.2',
          paddingBottom: '24px'
        }
      },
      {
        id: 'intro',
        type: 'text',
        props: {
          text: 'Discover how leading companies are transforming their workflow with our latest collaboration features.',
          fontSize: '18px',
          color: '#666666',
          textAlign: 'left',
          lineHeight: '1.6',
          paddingBottom: '32px'
        }
      },
      {
        id: 'read-more',
        type: 'button',
        props: {
          text: 'Read the full story',
          href: '#',
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: '32px',
          paddingX: '32px',
          paddingY: '16px',
          fontSize: '16px',
          fontWeight: '500',
          alignment: 'left'
        }
      },
      {
        id: 'divider',
        type: 'divider',
        props: {
          color: '#eeeeee',
          height: '1px',
          margin: '48px 0'
        }
      },
      {
        id: 'social-links',
        type: 'social',
        props: {
          networks: [
            { platform: 'twitter', url: '#' },
            { platform: 'linkedin', url: '#' },
            { platform: 'instagram', url: '#' }
          ],
          iconSize: '20px',
          spacing: '24px',
          alignment: 'left'
        }
      }
    ]
  }
]; 