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
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    description: 'A stunning email template designed specifically for showcasing ModuMail\'s capabilities and modern design',
    previewImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    category: 'announcement',
    blocks: [
      {
        id: 'hero-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2400&auto=format&fit=crop',
          alt: 'Modern workspace with laptop, coffee, and design tools',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'spacer-1',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'hero-title',
        type: 'text',
        props: {
          text: '🚀 Introducing ModuMail',
          fontSize: '36px',
          color: '#1f2937',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.1'
        }
      },
      {
        id: 'spacer-2',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'hero-subtitle',
        type: 'text',
        props: {
          text: 'The Future of Email Marketing is Here',
          fontSize: '24px',
          color: '#3b82f6',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-3',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'hero-description',
        type: 'text',
        props: {
          text: 'Build stunning, professional emails in minutes with our intuitive drag-and-drop editor. No coding required, just pure creativity.',
          fontSize: '18px',
          color: '#4b5563',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-4',
        type: 'spacer',
        props: {
          height: '40px'
        }
      },
      {
        id: 'features-title',
        type: 'text',
        props: {
          text: '✨ Why Choose ModuMail?',
          fontSize: '28px',
          color: '#1f2937',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-5',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'features-list',
        type: 'list',
        props: {
          items: [
            '🎨 Drag-and-drop visual editor',
            '📱 Mobile-responsive templates',
            '⚡ Lightning-fast performance',
            '🔧 Advanced customization options',
            '📊 Built-in analytics dashboard',
            '🚀 One-click deployment'
          ],
          listType: 'unordered',
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.8'
        }
      },
      {
        id: 'spacer-6',
        type: 'spacer',
        props: {
          height: '40px'
        }
      },
      {
        id: 'cta-section',
        type: 'text',
        props: {
          text: 'Ready to revolutionize your email marketing?',
          fontSize: '20px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-7',
        type: 'spacer',
        props: {
          height: '20px'
        }
      },
      {
        id: 'cta-button',
        type: 'button',
        props: {
          text: 'Start Building Now',
          url: '#',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          borderRadius: '12px',
          width: 'auto',
          align: 'left'
        }
      },
      {
        id: 'spacer-8',
        type: 'spacer',
        props: {
          height: '40px'
        }
      },
      {
        id: 'divider',
        type: 'divider',
        props: {
          width: '1px',
          color: '#e5e7eb',
          spacing: '32px'
        }
      },
      {
        id: 'spacer-9',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'social-title',
        type: 'text',
        props: {
          text: 'Connect With Us',
          fontSize: '18px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-10',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'social-links',
        type: 'social',
        props: {
          networks: [
            { platform: 'twitter', url: 'https://twitter.com' },
            { platform: 'linkedin', url: 'https://linkedin.com' },
            { platform: 'github', url: 'https://github.com' }
          ],
          alignment: 'left',
          iconSize: '24px',
          iconColor: '#6b7280'
        }
      },
      {
        id: 'spacer-11',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'footer-text',
        type: 'text',
        props: {
          text: 'Built with ❤️ using ModuMail • Modern email marketing made simple',
          fontSize: '14px',
          color: '#9ca3af',
          lineHeight: '1.5',
          textAlign: 'left'
        }
      }
    ]
  },
  {
    id: 'newsletter-modern',
    name: 'Newsletter - Modern',
    description: 'A contemporary newsletter template with dynamic sections and professional layout',
    previewImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    category: 'newsletter',
    blocks: [
      {
        id: 'header-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2400&auto=format&fit=crop',
          alt: 'Modern workspace with laptop and coffee',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'spacer-1',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'newsletter-title',
        type: 'text',
        props: {
          text: "This Week's Updates",
          fontSize: '28px',
          color: '#1f2937',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-2',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'newsletter-intro',
        type: 'text',
        props: {
          text: 'Discover the latest news, updates, and insights from our team. Stay ahead with our curated content.',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-3',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'feature-title',
        type: 'text',
        props: {
          text: 'Featured Article',
          fontSize: '20px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-4',
        type: 'spacer',
        props: {
          height: '8px'
        }
      },
      {
        id: 'feature-text',
        type: 'text',
        props: {
          text: 'Learn about the latest trends in digital marketing and how they can transform your business strategy.',
          fontSize: '15px',
          color: '#4b5563',
          lineHeight: '1.5',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-5',
        type: 'spacer',
        props: {
          height: '20px'
        }
      },
      {
        id: 'read-more-button',
        type: 'button',
        props: {
          text: 'Read Full Article',
          url: '#',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          borderRadius: '8px',
          width: 'auto',
          align: 'left'
        }
      },
      {
        id: 'spacer-6',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'divider',
        type: 'divider',
        props: {
          width: '1px',
          color: '#e5e7eb',
          spacing: '24px'
        }
      },
      {
        id: 'spacer-7',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'social-title',
        type: 'text',
        props: {
          text: 'Follow Us',
          fontSize: '16px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-8',
        type: 'spacer',
        props: {
          height: '12px'
        }
      },
      {
        id: 'social-links',
        type: 'social',
        props: {
          networks: [
            { platform: 'twitter', url: 'https://twitter.com' },
            { platform: 'linkedin', url: 'https://linkedin.com' },
            { platform: 'facebook', url: 'https://facebook.com' }
          ],
          alignment: 'center',
          iconSize: '24px',
          iconColor: '#6b7280'
        }
      }
    ]
  },
  {
    id: 'welcome-minimal',
    name: 'Welcome Email - Minimal',
    description: 'A clean and modern welcome email template with minimalist design and clear onboarding',
    previewImage: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop',
    category: 'transactional',
    blocks: [
      {
        id: 'spacer-1',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'welcome-title',
        type: 'text',
        props: {
          text: 'Welcome to ModuMail!',
          fontSize: '32px',
          color: '#1f2937',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.2'
        }
      },
      {
        id: 'spacer-2',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'welcome-text',
        type: 'text',
        props: {
          text: "We're thrilled to have you join our community! You're now part of thousands of creators building amazing email campaigns.",
          fontSize: '18px',
          color: '#4b5563',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-3',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'steps-title',
        type: 'text',
        props: {
          text: 'Get Started in 3 Easy Steps',
          fontSize: '22px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-4',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'steps-list',
        type: 'list',
        props: {
          items: [
            'Choose a template from our gallery',
            'Customize your content and design',
            'Send your first email campaign'
          ],
          listType: 'ordered',
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.6'
        }
      },
      {
        id: 'spacer-5',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'cta-button',
        type: 'button',
        props: {
          text: 'Start Creating',
          url: '#',
          backgroundColor: '#10b981',
          textColor: '#ffffff',
          borderRadius: '12px',
          width: 'auto',
          align: 'left'
        }
      },
      {
        id: 'spacer-6',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'help-text',
        type: 'text',
        props: {
          text: 'Need help? Our support team is here for you 24/7.',
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.5',
          textAlign: 'left'
        }
      }
    ]
  },
  {
    id: 'product-announcement',
    name: 'Product Launch',
    description: 'Announce your new product or feature with this eye-catching template and compelling features',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    category: 'announcement',
    blocks: [
      {
        id: 'product-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop',
          alt: 'Modern office setup with laptop and devices',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'spacer-1',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'announcement-title',
        type: 'text',
        props: {
          text: '🚀 Introducing ModuMail Pro',
          fontSize: '32px',
          color: '#1f2937',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.2'
        }
      },
      {
        id: 'spacer-2',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'announcement-text',
        type: 'text',
        props: {
          text: 'The future of email marketing is here. Experience unprecedented power, flexibility, and results.',
          fontSize: '18px',
          color: '#4b5563',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-3',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'features-title',
        type: 'text',
        props: {
          text: 'What\'s New in Pro',
          fontSize: '24px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-4',
        type: 'spacer',
        props: {
          height: '20px'
        }
      },
      {
        id: 'features-list',
        type: 'list',
        props: {
          items: [
            'Advanced AI-powered content suggestions',
            'Real-time collaboration with your team',
            'Advanced analytics and performance insights',
            'Custom integrations with 100+ tools',
            'Priority support and dedicated account manager'
          ],
          listType: 'unordered',
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.6'
        }
      },
      {
        id: 'spacer-5',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'cta-section',
        type: 'text',
        props: {
          text: 'Ready to transform your email marketing?',
          fontSize: '18px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-6',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'learn-more-button',
        type: 'button',
        props: {
          text: 'Upgrade to Pro',
          url: '#',
          backgroundColor: '#7c3aed',
          textColor: '#ffffff',
          borderRadius: '12px',
          width: 'auto',
          align: 'left'
        }
      },
      {
        id: 'spacer-7',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'urgency-text',
        type: 'text',
        props: {
          text: 'Limited time: 50% off for early adopters',
          fontSize: '14px',
          color: '#dc2626',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      }
    ]
  },
  {
    id: 'promotional-sale',
    name: 'Special Offer',
    description: 'Drive conversions with this engaging promotional email template and compelling offers',
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
        id: 'spacer-1',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'sale-title',
        type: 'text',
        props: {
          text: '🎉 FLASH SALE - 50% OFF!',
          fontSize: '32px',
          color: '#dc2626',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.2'
        }
      },
      {
        id: 'spacer-2',
        type: 'spacer',
        props: {
          height: '12px'
        }
      },
      {
        id: 'sale-subtitle',
        type: 'text',
        props: {
          text: 'Everything you need to create stunning emails',
          fontSize: '20px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-3',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'sale-description',
        type: 'text',
        props: {
          text: 'Don\'t miss out! This exclusive offer expires in 48 hours. Upgrade your email marketing game today.',
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-4',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'benefits-title',
        type: 'text',
        props: {
          text: 'What You Get',
          fontSize: '18px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-5',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'benefits-list',
        type: 'list',
        props: {
          items: [
            'Unlimited email campaigns',
            'Advanced analytics dashboard',
            'Premium template library',
            'Priority customer support'
          ],
          listType: 'unordered',
          fontSize: '15px',
          color: '#4b5563',
          lineHeight: '1.5'
        }
      },
      {
        id: 'spacer-6',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'sale-button',
        type: 'button',
        props: {
          text: 'Claim 50% Off Now',
          url: '#',
          backgroundColor: '#dc2626',
          textColor: '#ffffff',
          borderRadius: '12px',
          width: 'auto',
          align: 'left'
        }
      },
      {
        id: 'spacer-7',
        type: 'spacer',
        props: {
          height: '20px'
        }
      },
      {
        id: 'urgency-text',
        type: 'text',
        props: {
          text: '⏰ Offer expires in 47 hours, 23 minutes',
          fontSize: '14px',
          color: '#dc2626',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-8',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'disclaimer-text',
        type: 'text',
        props: {
          text: 'Terms and conditions apply. Cannot be combined with other offers.',
          fontSize: '12px',
          color: '#9ca3af',
          lineHeight: '1.4',
          textAlign: 'left'
        }
      }
    ]
  },
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    description: 'Professional event invitation template with clear details and compelling design',
    previewImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    category: 'announcement',
    blocks: [
      {
        id: 'event-image',
        type: 'image',
        props: {
          src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2400&auto=format&fit=crop',
          alt: 'Professional conference event setup',
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      },
      {
        id: 'spacer-1',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'event-title',
        type: 'text',
        props: {
          text: '📅 You\'re Invited!',
          fontSize: '32px',
          color: '#1f2937',
          fontWeight: '700',
          textAlign: 'left',
          lineHeight: '1.2'
        }
      },
      {
        id: 'spacer-2',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'event-name',
        type: 'text',
        props: {
          text: 'Digital Marketing Summit 2024',
          fontSize: '24px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.3'
        }
      },
      {
        id: 'spacer-3',
        type: 'spacer',
        props: {
          height: '24px'
        }
      },
      {
        id: 'event-details',
        type: 'text',
        props: {
          text: 'Join industry leaders for a day of insights, networking, and innovation in digital marketing.',
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.6',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-4',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'event-info-title',
        type: 'text',
        props: {
          text: 'Event Details',
          fontSize: '20px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-5',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'event-info-list',
        type: 'list',
        props: {
          items: [
            '📅 Date: March 15, 2024',
            '🕐 Time: 9:00 AM - 5:00 PM',
            '📍 Location: Convention Center, Downtown',
            '💰 Price: $299 (Early bird: $199)',
            '🍽️ Includes: Lunch, networking reception'
          ],
          listType: 'unordered',
          fontSize: '15px',
          color: '#4b5563',
          lineHeight: '1.6'
        }
      },
      {
        id: 'spacer-6',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'speakers-title',
        type: 'text',
        props: {
          text: 'Featured Speakers',
          fontSize: '18px',
          color: '#374151',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      },
      {
        id: 'spacer-7',
        type: 'spacer',
        props: {
          height: '16px'
        }
      },
      {
        id: 'speakers-text',
        type: 'text',
        props: {
          text: 'Hear from top executives at Google, Facebook, and leading marketing agencies.',
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.5',
          textAlign: 'left'
        }
      },
      {
        id: 'spacer-8',
        type: 'spacer',
        props: {
          height: '32px'
        }
      },
      {
        id: 'rsvp-button',
        type: 'button',
        props: {
          text: 'RSVP Now',
          url: '#',
          backgroundColor: '#059669',
          textColor: '#ffffff',
          borderRadius: '12px',
          width: 'auto',
          align: 'left'
        }
      },
      {
        id: 'spacer-9',
        type: 'spacer',
        props: {
          height: '20px'
        }
      },
      {
        id: 'urgency-text',
        type: 'text',
        props: {
          text: 'Limited seats available - Early bird pricing ends soon!',
          fontSize: '14px',
          color: '#dc2626',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.4'
        }
      }
    ]
  }
]; 