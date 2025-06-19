import React from 'react';
import { Block } from '@/types/blocks';

interface DividerBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const DividerBlock: React.FC<DividerBlockProps> = ({ block, isSelected }) => {
  const { 
    borderStyle = 'solid',
    borderWidth = '1px',
    color = '#e5e7eb'
  } = block.props;

  return (
    <div className={`
      py-4 px-8
      ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
    `}>
      <hr 
        className="border-0" 
        style={{
          borderTopWidth: borderWidth,
          borderTopStyle: borderStyle,
          borderTopColor: color
        }}
      />
    </div>
  );
}; 