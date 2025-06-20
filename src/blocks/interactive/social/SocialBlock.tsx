import React from 'react';
import { BlockComponentProps, SocialBlockProps, TextAlignment } from '@/types/blocks';
import Image from 'next/image';

export const SocialBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false
}) => {
  const props = block.props as SocialBlockProps;
  const {
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube,
    iconSize = '24px',
    iconSpacing = '16px',
    iconColor = '#000000',
    alignment = 'center'
  } = props;

  const networks = [
    { key: 'facebook', url: facebook },
    { key: 'twitter', url: twitter },
    { key: 'linkedin', url: linkedin },
    { key: 'instagram', url: instagram },
    { key: 'youtube', url: youtube }
  ].filter(network => network.url);

  if (networks.length === 0) {
    return (
      <div className={`p-4 text-gray-500 text-sm ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
        <div className="flex gap-4">
          <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="opacity-30" />
          <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} className="opacity-30" />
          <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="opacity-30" />
        </div>
        <div className="mt-2">No social links added</div>
      </div>
    );
  }

  const iconSizeNum = parseInt(iconSize as string);

  return (
    <div 
      className={`p-4 ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      style={{ textAlign: alignment as TextAlignment }}
    >
      <div style={{ display: 'inline-block' }}>
        {networks.map((network, index) => (
          <a 
            key={network.key}
            href={network.url as string}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: index < networks.length - 1 ? iconSpacing as string : undefined,
              display: 'inline-block',
              textDecoration: 'none',
            }}
          >
            <Image 
              src={`/icons/${network.key}.svg`}
              alt={network.key}
              width={iconSizeNum}
              height={iconSizeNum}
              style={{
                filter: iconColor !== '#000000' ? getColorFilter(iconColor as string) : undefined,
              }}
            />
          </a>
        ))}
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