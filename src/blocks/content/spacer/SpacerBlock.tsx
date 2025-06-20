import React from 'react';
import { BlockComponentProps, SpacerBlockProps } from '@/types/blocks';

export const SpacerBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as SpacerBlockProps;
  const { height = '32px' } = props;

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
          height,
          backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
          transition: 'background-color 0.2s ease-in-out',
        }}
      />
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 