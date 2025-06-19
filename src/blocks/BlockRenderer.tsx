import React from 'react';
import { Block } from '@/types/blocks';
import { blockManager } from './registry';

export interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  onUpdate?: (block: Block) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ 
  block, 
  isSelected = false,
  onUpdate,
  onClick,
  children 
}) => {
  const blockData = blockManager.getBlock(block.type);
  
  if (!blockData) {
    console.warn(`No block registered for type: ${block.type}`);
    return null;
  }

  const { component: Component } = blockData;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Component 
        block={block}
        isSelected={isSelected}
        onUpdate={onUpdate}
      >
        {children}
      </Component>
    </div>
  );
}; 