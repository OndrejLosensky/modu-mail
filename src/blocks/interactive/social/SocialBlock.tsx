import React from 'react';
import { BlockComponentProps, SocialBlockProps } from '@/types/blocks';

export const SocialBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false
}) => {
  const props = block.props as SocialBlockProps;
  const { networks = [] } = props;

  return (
    <div className={`${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
      {networks.map((network, index) => (
        <a 
          key={index}
          href={network.url}
          className="mr-4 last:mr-0 hover:opacity-80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {network.name as string}
        </a>
      ))}
    </div>
  );
}; 