import React from 'react';
import { BlockComponentProps, DividerBlockProps, TextAlignment } from '@/types/blocks';

export const DividerBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false
}) => {
  // Type assertion to get the specific divider props
  const props = block.props as DividerBlockProps;
  const {
    color = '#e5e7eb',
    height = '1px',
    width = '100%',
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
      <div
        style={{
          margin: 0,
          width: width as string,
          height,
          backgroundColor: color,
          display: 'inline-block',
        }}
      />
    </div>
  );
}; 