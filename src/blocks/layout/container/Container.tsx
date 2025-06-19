import React from 'react';
import { BlockComponentProps, ContainerBlockProps } from '@/types/blocks';

export const Container: React.FC<BlockComponentProps> = ({ block, children }) => {
  // Type assertion to get the specific container props
  const props = block.props as ContainerBlockProps;
  const { maxWidth, padding, backgroundColor, align } = props;

  return (
    <div
      style={{
        maxWidth,
        padding,
        backgroundColor,
        margin: align === 'center' ? '0 auto' : undefined,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}; 