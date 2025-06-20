import { Block } from '@/types/blocks';

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: 'newsletter' | 'marketing' | 'transactional' | 'announcement';
  blocks: Block[];
}

export const templates: EmailTemplate[] = [
  {
    id: 'newsletter-modern',
    name: 'Newsletter - Modern',
    description: 'A contemporary newsletter template with dynamic sections',
    previewImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    category: 'newsletter',
    blocks: [
      {
        id: 'header-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2400&auto=format&fit=crop',
          alt: 'Newsletter Header - Laptop with coffee and notebook',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'newsletter-title',
        type: 'text',
        props: {
          text: "This Week's Updates",
          fontSize: '32px',
          color: '#1a1a1a',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.2'
        }
      },
      {
        id: 'newsletter-intro',
        type: 'text',
        props: {
          text: 'Discover the latest news, updates, and insights from our team.',
          fontSize: '16px',
          color: '#666666',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'read-more-button',
        type: 'button',
        props: {
          text: 'Read More',
          url: '#',
          backgroundColor: '#18181B',
          textColor: '#ffffff',
          borderRadius: '6px',
          width: 'auto',
          align: 'left'
        }
      }
    ]
  },
  {
    id: 'welcome-minimal',
    name: 'Welcome Email - Minimal',
    description: 'A clean and modern welcome email template with minimalist design',
    previewImage: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop',
    category: 'transactional',
    blocks: [
      {
        id: 'welcome-title',
        type: 'text',
        props: {
          text: 'Welcome to Our Service',
          fontSize: '32px',
          color: '#1a1a1a',
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: '1.2'
        }
      },
      {
        id: 'welcome-text',
        type: 'text',
        props: {
          text: "We're excited to have you on board! Here's everything you need to know to get started.",
          fontSize: '16px',
          color: '#666666',
          lineHeight: '1.6',
          textAlign: 'center'
        }
      },
      {
        id: 'cta-button',
        type: 'button',
        props: {
          text: 'Get Started',
          url: '#',
          backgroundColor: '#0066FF',
          textColor: '#ffffff',
          borderRadius: '8px',
          width: 'auto',
          align: 'center'
        }
      }
    ]
  },
  {
    id: 'product-announcement',
    name: 'Product Launch',
    description: 'Announce your new product or feature with this eye-catching template',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    category: 'announcement',
    blocks: [
      {
        id: 'product-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop',
          alt: 'Product Launch - Modern office setup with laptop and devices',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'announcement-title',
        type: 'text',
        props: {
          text: 'Introducing Our Latest Innovation',
          fontSize: '32px',
          color: '#1a1a1a',
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: '1.2'
        }
      },
      {
        id: 'announcement-text',
        type: 'text',
        props: {
          text: 'Experience the future today with our groundbreaking new product.',
          fontSize: '16px',
          color: '#666666',
          lineHeight: '1.6',
          textAlign: 'center'
        }
      },
      {
        id: 'features-list',
        type: 'list',
        props: {
          items: [
            'Revolutionary new design',
            'Enhanced performance',
            'Seamless integration',
            'Advanced security features'
          ],
          listType: 'unordered',
          fontSize: '16px',
          color: '#333333',
          lineHeight: '1.6'
        }
      },
      {
        id: 'learn-more-button',
        type: 'button',
        props: {
          text: 'Learn More',
          url: '#',
          backgroundColor: '#18181B',
          textColor: '#ffffff',
          borderRadius: '6px',
          width: 'auto',
          align: 'center'
        }
      }
    ]
  },
  {
    id: 'promotional-sale',
    name: 'Special Offer',
    description: 'Drive conversions with this engaging promotional email template',
    previewImage: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1200&auto=format&fit=crop',
    category: 'marketing',
    blocks: [
      {
        id: 'sale-banner',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2400&auto=format&fit=crop',
          alt: 'Special Offer - Shopping bags and gift boxes',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'sale-title',
        type: 'text',
        props: {
          text: 'Limited Time Offer',
          fontSize: '36px',
          color: '#FF3366',
          fontWeight: '700',
          textAlign: 'center',
          lineHeight: '1.2'
        }
      },
      {
        id: 'sale-description',
        type: 'text',
        props: {
          text: 'Get 30% off on all products this weekend only!',
          fontSize: '18px',
          color: '#333333',
          lineHeight: '1.6',
          textAlign: 'center'
        }
      },
      {
        id: 'sale-button',
        type: 'button',
        props: {
          text: 'Shop Now',
          url: '#',
          backgroundColor: '#FF3366',
          textColor: '#ffffff',
          borderRadius: '8px',
          width: 'auto',
          align: 'center'
        }
      }
    ]
  }
]; 