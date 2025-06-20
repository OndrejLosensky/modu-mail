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
    height = '1px',
    style = 'solid',
    alignment = 'center'
  } = props;

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
    >
      <div
        style={{
          width,
          margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0',
        }}
      >
        <hr
          style={{
            border: 'none',
            borderTop: `${height} ${style} ${color}`,
            margin: '0',
            padding: '0',
          }}
        />
      </div>
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 