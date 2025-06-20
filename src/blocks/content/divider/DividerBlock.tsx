import React from 'react';
import { BlockComponentProps, DividerBlockProps } from '@/types/blocks';

export const DividerBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as DividerBlockProps;
  const {
    color = '#e5e7eb',
    width = '100%',
    style = 'solid',
    spacing = '4px'
  } = props;

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
    >
      <hr
        style={{
          border: 'none',
          borderTop: `${spacing} ${style} ${color}`,
          width,
          margin: '0 auto',
        }}
      />
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 