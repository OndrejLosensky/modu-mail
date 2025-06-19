import React from 'react';
import { BlockComponentProps, DividerBlockProps } from '@/types/blocks';

export const DividerBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false
}) => {
  // Type assertion to get the specific divider props
  const props = block.props as DividerBlockProps;
  const {
    color = '#e5e7eb',
    height = '1px',
    width = '100%',
    borderStyle = 'solid'
  } = props;

  return (
    <div
      className={`
        p-4
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
    >
      <hr
        style={{
          margin: 0,
          border: 'none',
          height,
          background: color,
          width: width as string,
          borderTop: `${height} ${borderStyle} ${color}`,
        }}
      />
    </div>
  );
}; 