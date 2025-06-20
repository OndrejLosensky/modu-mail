import React from 'react';
import { BlockComponentProps, SocialBlockProps as ISocialBlockProps } from '@/types/blocks';
import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';
import Image from 'next/image';

const PLATFORM_ICONS: Record<string, string> = {
  facebook: 'facebook',
  twitter: 'twitter',
  linkedin: 'linkedin',
  instagram: 'instagram',
  youtube: 'youtube'
};

export const SocialBlock: React.FC<BlockComponentProps> = ({ block, isSelected }) => {
  const props = block.props as ISocialBlockProps;
  const { 
    networks = [], 
    iconSize = '24px',
    spacing = '16px',
    alignment = 'center',
    iconColor = '#000000'
  } = props;

  // Filter out networks without URLs
  const validNetworks = networks.filter(network => network.url && network.url.trim() !== '');
  
  if (validNetworks.length === 0) {
    return null;
  }
  
  const iconSizeNum = parseInt(iconSize);
  
  return (
    <div 
      className={`w-full transition-all ${isSelected ? 'outline-2 outline-blue-500 outline-offset-2' : ''}`}
    >
      <div 
        className="flex flex-wrap gap-4" 
        style={{ 
          justifyContent: alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center',
          gap: spacing 
        }}
      >
        {validNetworks.map((network, index) => {
          const platform = network.platform?.toLowerCase() || 'social';
          const iconName = PLATFORM_ICONS[platform] || platform;
          
          return (
            <a
              key={`${platform}-${index}`}
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Image 
                src={`/icons/${iconName}.svg`}
                alt=""
                width={iconSizeNum}
                height={iconSizeNum}
                style={{
                  filter: iconColor !== '#000000' ? getColorFilter(iconColor) : undefined,
                }}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

function getColorFilter(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  return `brightness(0) saturate(100%) invert(${Math.round(r * 100)}%) sepia(${Math.round(g * 100)}%) saturate(${Math.round(b * 100)}%)`;
}

export const socialConfig: BaseComponentConfig = {
  id: 'social',
  type: 'social',
  label: 'Social Links',
  description: 'Add social media links',
  category: ComponentCategory.Interactive,
  icon: 'share',
  defaultProps: {
    networks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ],
    iconSize: '24px',
    spacing: '16px',
    alignment: 'center',
    iconColor: '#000000'
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