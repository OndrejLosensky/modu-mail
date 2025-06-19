import React from 'react';
import { Block } from '@/types/blocks';

interface ButtonBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ block, isSelected }) => {
  const { 
    text = 'Get Started', 
    href = '#',
    fontSize = '16px',
    color = '#ffffff',
    backgroundColor = '#3b82f6',
    textAlign = 'left'
  } = block.props;

  return (
    <div className={`
      p-4 flex
      ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'}
    `}>
      <a 
        href={href}
        style={{
          fontSize,
          color,
          backgroundColor
        }}
        className="
          px-6 py-3 rounded-lg font-medium no-underline
          hover:opacity-90 transition-opacity
        "
      >
        {text}
      </a>
    </div>
  );
}; 