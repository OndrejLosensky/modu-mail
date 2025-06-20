import React from 'react';
import { BlockComponentProps, ImageBlockProps } from '@/types/blocks';

export const ImageBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as ImageBlockProps;
  const {
    src = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
    alt = '',
    width = '100%',
    height = '100%',
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
            objectFit: 'cover',
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