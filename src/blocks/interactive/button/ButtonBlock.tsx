import React from 'react';
import { BlockComponentProps, ButtonBlockProps, TextAlignment } from '@/types/blocks';

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
    borderRadius = '4px',
    paddingX = '24px',
    paddingY = '12px',
    alignment = 'center'
  } = props;

  return (
    <div
      className={`
        p-4
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      style={{
        textAlign: alignment as TextAlignment,
      }}
    >
      <a
        href={href}
        style={{
          backgroundColor,
          color,
          borderRadius: borderRadius as string,
          padding: `${paddingY} ${paddingX}`,
          display: 'inline-block',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          border: 'none',
          fontFamily: 'sans-serif',
        }}
        className="hover:opacity-90"
      >
        {text}
      </a>
    </div>
  );
}; 