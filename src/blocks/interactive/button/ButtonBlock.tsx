import React from 'react';
import { BlockComponentProps, ButtonBlockProps } from '@/types/blocks';

export const ButtonBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  // Type assertion to get the specific button props
  const props = block.props as ButtonBlockProps;
  const {
    text = 'Click me',
    url = '#',
    backgroundColor = '#3b82f6',
    textColor = '#ffffff',
    borderRadius = '4px',
    width = 'auto',
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
      <a
        href={url}
        onClick={(e) => e.preventDefault()}
        style={{
          backgroundColor,
          color: textColor,
          borderRadius,
          padding: '12px 24px',
          display: 'inline-block',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          border: 'none',
          fontFamily: 'sans-serif',
          width: width === 'full' ? '100%' : 'auto',
          textAlign: 'center',
        }}
        className="hover:opacity-90"
      >
        {text}
      </a>
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 