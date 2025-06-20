import React from 'react';
import { BlockComponentProps, ImageBlockProps } from '@/types/blocks';

export const ImageBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as ImageBlockProps;
  const {
    src = 'https://via.placeholder.com/800x400',
    alt = '',
    width = '100%',
    height = 'auto',
    align = 'center'
  } = props;

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
      style={{
        textAlign: align as 'left' | 'center' | 'right',
      }}
    >
      <div style={{ display: 'inline-block', maxWidth: '100%' }}>
        <img
          src={src}
          alt={alt}
          style={{
            width,
            height,
            maxWidth: '100%',
            verticalAlign: 'middle',
          }}
        />
      </div>
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 