import React from 'react';
import { Block } from '@/types/blocks';

interface ButtonBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ block, isSelected }) => {
  const { text = 'Get Started', href = '#' } = block.props;

  return (
    <div className={`
      p-4 flex justify-center
      ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
    `}>
      <button 
        type="button"
        className="
          px-6 py-3 bg-blue-500 text-white rounded-lg font-medium
          hover:bg-blue-600 transition-colors
        "
      >
        {text}
      </button>
    </div>
  );
}; 