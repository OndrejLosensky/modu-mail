import React from 'react';
import { BlockComponentProps, SpacerBlockProps } from '@/types/blocks';

export const SpacerBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false
}) => {
  const props = block.props as SpacerBlockProps;
  const { height = '20px' } = props;

  return (
    <div
      className={`${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      style={{ height }}
    />
  );
}; 