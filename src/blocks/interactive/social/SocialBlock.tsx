import React from 'react';
import { BlockComponentProps, SocialBlockProps } from '@/types/blocks';
import Image from 'next/image';

export const SocialBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as SocialBlockProps;
  const {
    networks = [],
    iconColor = '#000000',
    iconSize = '24px',
    align = 'center'
  } = props;

  if (networks.length === 0) {
    return (
      <div 
        onClick={onClick}
        className={`
          p-4 text-gray-500 text-sm cursor-pointer transition-all duration-200
          ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
        `}
      >
        <div className="flex gap-4">
          <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="opacity-30" />
          <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} className="opacity-30" />
          <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="opacity-30" />
        </div>
        <div className="mt-2">No social links added</div>
      </div>
    );
  }

  const iconSizeNum = parseInt(iconSize);

  return (
    <div 
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
      style={{ textAlign: align as 'left' | 'center' | 'right' }}
    >
      <div style={{ display: 'inline-block' }}>
        {networks.map((network, index) => (
          <a 
            key={network.type}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.preventDefault()}
            style={{
              marginRight: index < networks.length - 1 ? '16px' : undefined,
              display: 'inline-block',
              textDecoration: 'none',
            }}
          >
            <Image 
              src={`/icons/${network.type}.svg`}
              alt={network.type}
              width={iconSizeNum}
              height={iconSizeNum}
              style={{
                filter: iconColor !== '#000000' ? getColorFilter(iconColor) : undefined,
              }}
            />
          </a>
        ))}
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