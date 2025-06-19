import React from 'react';
import { Block } from '@/types/blocks';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { ButtonBlock } from './ButtonBlock';
import { DividerBlock } from './DividerBlock';

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
  onClick: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onUpdate,
  onClick,
}) => {
  const blockComponents = {
    text: TextBlock,
    image: ImageBlock,
    button: ButtonBlock,
    divider: DividerBlock,
  };

  const Component = blockComponents[block.type];

  if (!Component) {
    return null;
  }

  return (
    <div 
      onClick={onClick}
      className="relative group"
    >
      <Component
        block={block}
        isSelected={isSelected}
        onUpdate={onUpdate}
      />
      <div className={`
        absolute -left-10 top-1/2 -translate-y-1/2 flex items-center justify-center
        w-6 h-6 rounded border bg-white text-gray-400
        opacity-0 group-hover:opacity-100 transition-opacity
        ${isSelected ? 'opacity-100' : ''}
      `}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
    </div>
  );
}; 