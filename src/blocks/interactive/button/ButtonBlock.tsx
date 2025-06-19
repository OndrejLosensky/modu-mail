import React from 'react';
import { BlockComponentProps, ButtonBlockProps } from '@/types/blocks';

export const ButtonBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false
}) => {
  // Type assertion to get the specific button props
  const props = block.props as ButtonBlockProps;
  const {
    text = 'Click me',
    href = '#',
    backgroundColor = '#3b82f6',
    color = '#ffffff',
    fontSize = '16px',
    padding = '12px 24px',
    borderRadius = '6px',
    align = 'left',
    border
  } = props;

  return (
    <div
      className={`
        p-4 flex
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}
      `}
    >
      <a
        href={href}
        style={{
          backgroundColor,
          color,
          fontSize,
          padding,
          borderRadius,
          border,
          display: 'inline-block',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        }}
        className="hover:opacity-90"
      >
        {text}
      </a>
    </div>
  );
}; 