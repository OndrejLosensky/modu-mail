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
    listType = 'unordered',
    color = '#1f2937',
    fontSize = '16px',
    textAlign = 'left',
    spacing = '8px',
    bulletColor = color
  } = props;

  // Ensure items is an array
  const parsedItems = Array.isArray(items) 
    ? items.filter(Boolean)
    : [];

  const ListTag = listType === 'ordered' ? 'ol' : 'ul';

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
          color: bulletColor,
          fontSize,
          lineHeight: '1.5',
          margin: 0,
          paddingLeft: '2em',
          textAlign,
        }}
      >
        {parsedItems.map((item: string, index: number) => (
          <li 
            key={index}
            style={{
              marginBottom: index < parsedItems.length - 1 ? spacing : 0,
            }}
          >
            <span style={{ color }}>{item}</span>
          </li>
        ))}
      </ListTag>
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 