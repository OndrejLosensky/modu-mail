import React from 'react';
import { BlockComponentProps } from '@/types/blocks';
import Image from 'next/image';

const PLATFORM_ICONS: Record<string, string> = {
  facebook: 'facebook',
  twitter: 'twitter',
  linkedin: 'linkedin',
  instagram: 'instagram',
  youtube: 'youtube'
};

// Get the base URL for icons - in preview we need to use absolute path
const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

export const SocialBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as Record<string, string>;
  const {
    iconColor = '#000000',
    iconSize = '24px',
    spacing = '16px',
    alignment = 'center'
  } = props;

  const networks = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
  const validNetworks = networks.filter(network => props[network] && props[network].trim() !== '');

  if (validNetworks.length === 0) {
    return (
      <div 
        onClick={onClick}
        className={`
          p-4 text-gray-500 text-sm cursor-pointer transition-all duration-200
          ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
        `}
      >
        <div className="flex gap-4 justify-center">
          <span className="sr-only">Social media placeholders</span>
          <Image 
            src={`${baseUrl}/icons/facebook.svg`}
            alt="" 
            width={24} 
            height={24} 
            className="opacity-30" 
            aria-hidden="true"
          />
          <Image 
            src={`${baseUrl}/icons/twitter.svg`}
            alt="" 
            width={24} 
            height={24} 
            className="opacity-30" 
            aria-hidden="true"
          />
          <Image 
            src={`${baseUrl}/icons/linkedin.svg`}
            alt="" 
            width={24} 
            height={24} 
            className="opacity-30" 
            aria-hidden="true"
          />
        </div>
        <div className="mt-2 text-center">No social links added</div>
      </div>
    );
  }

  const iconSizeNum = parseInt(iconSize);
  const spacingNum = parseInt(spacing);

  return (
    <div 
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
      style={{ textAlign: alignment as 'left' | 'center' | 'right' }}
    >
      <div className="inline-flex" style={{ gap: `${spacingNum}px` }}>
        {validNetworks.map((network, index) => {
          const iconName = PLATFORM_ICONS[network] || network;
          const capitalizedNetwork = network.charAt(0).toUpperCase() + network.slice(1);
          
          return (
            <a 
              key={`${network}-${index}`}
              href={props[network]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.preventDefault()}
              className="inline-block"
              aria-label={`${capitalizedNetwork} social media link`}
            >
              <Image 
                src={`${baseUrl}/icons/${iconName}.svg`}
                alt=""
                width={iconSizeNum}
                height={iconSizeNum}
                className="transition-opacity hover:opacity-80"
                style={{
                  filter: iconColor !== '#000000' ? getColorFilter(iconColor) : undefined,
                }}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
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