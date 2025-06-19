import React from 'react';
import { Block, SocialBlockProps as ISocialBlockProps } from '@/types/blocks';
import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

interface SocialComponentProps {
  block: Block & { props: ISocialBlockProps };
  isSelected?: boolean;
}

const socialIcons = {
  facebook: '📘',
  twitter: '🐦',
  linkedin: '💼',
  instagram: '📸',
  youtube: '🎥',
};

export const SocialBlock: React.FC<SocialComponentProps> = ({ block, isSelected }) => {
  const { 
    networks = [], 
    iconSize = '24px',
    spacing = '16px',
    alignment = 'center'
  } = block.props;
  
  return (
    <div 
      className={`w-full transition-all ${isSelected ? 'outline outline-2 outline-blue-500 outline-offset-2' : ''}`}
    >
      <div 
        className="flex flex-wrap gap-4" 
        style={{ 
          justifyContent: alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center',
          gap: spacing 
        }}
      >
        {networks.map((network, index) => (
          <a
            key={index}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ fontSize: iconSize }}
          >
            {socialIcons[network.platform as keyof typeof socialIcons] || '🔗'}
          </a>
        ))}
      </div>
    </div>
  );
};

export const socialConfig: BaseComponentConfig = {
  id: 'social',
  type: 'social',
  label: 'Social Links',
  description: 'Add social media links',
  category: ComponentCategory.SOCIAL,
  icon: 'share',
  defaultProps: {
    networks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ],
    iconSize: '24px',
    spacing: '16px',
    alignment: 'center'
  },
  validation: {
    required: ['networks'],
    rules: {
      networks: (value) => {
        if (!Array.isArray(value)) return 'Networks must be an array';
        if (value.length === 0) return 'At least one social network is required';
        return true;
      },
      iconSize: (value) => {
        if (typeof value !== 'string') return 'Icon size must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Icon size must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      }
    }
  },
  presets: {
    'minimal': {
      networks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' }
      ],
      iconSize: '20px',
      spacing: '12px'
    },
    'standard': {
      networks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ],
      iconSize: '24px',
      spacing: '16px'
    },
    'expanded': {
      networks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'youtube', url: 'https://youtube.com' }
      ],
      iconSize: '32px',
      spacing: '24px'
    }
  }
}; 