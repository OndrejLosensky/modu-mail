import React from 'react';
import { Block } from '@/types/blocks';

interface DividerBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const DividerBlock: React.FC<DividerBlockProps> = ({ isSelected }) => {
  return (
    <div className={`
      py-4 px-8
      ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
    `}>
      <hr className="border-t-2 border-gray-200" />
    </div>
  );
}; 