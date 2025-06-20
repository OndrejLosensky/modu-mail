import React from 'react';
import { BlockComponentProps, ListBlockProps } from '@/types/blocks';

export const ListBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onClick
}) => {
  const props = block.props as ListBlockProps;
  const {
    items = [],
    type = 'unordered',
    color = '#000000',
    fontSize = '16px',
    lineHeight = '1.5'
  } = props;

  const ListTag = type === 'ordered' ? 'ol' : 'ul';

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
    >
      <ListTag
        style={{
          color,
          fontSize,
          lineHeight,
          margin: 0,
          paddingLeft: '1.5em',
        }}
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ListTag>
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 