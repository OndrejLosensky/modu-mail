import React, { useState } from 'react';
import { BlockComponentProps, ListBlockProps } from '@/types/blocks';

export const ListBlock: React.FC<BlockComponentProps> = ({ 
  block, 
  isSelected = false,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Type assertion to get the specific list props
  const props = block.props as ListBlockProps;
  const { 
    items = ['First item', 'Second item', 'Third item'],
    listType = 'unordered',
    fontSize = '16px',
    color = '#1f2937',
    textAlign = 'left',
    bulletColor = '#1f2937',
    spacing = '0.5em'
  } = props;

  const handleItemEdit = (index: number, newValue: string) => {
    if (!onUpdate) return;

    const newItems = [...items];
    newItems[index] = newValue;

    onUpdate({
      ...block,
      props: {
        ...block.props,
        items: newItems
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!onUpdate) return;

      const newItems = [...items];
      newItems.splice(index + 1, 0, '');
      
      onUpdate({
        ...block,
        props: {
          ...block.props,
          items: newItems
        }
      });

      // Focus will be handled by useEffect in the parent
    } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault();
      if (!onUpdate) return;

      const newItems = [...items];
      newItems.splice(index, 1);
      
      onUpdate({
        ...block,
        props: {
          ...block.props,
          items: newItems
        }
      });
    }
  };

  return (
    <div 
      className={`
        p-4 outline-none transition-all
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isEditing ? 'bg-blue-50/50' : ''}
      `}
      style={{
        color,
        fontSize,
        textAlign
      }}
    >
      {listType === 'ordered' ? (
        <ol 
          className="list-decimal list-inside" 
          style={{ 
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 0,
            lineHeight: 1.5,
            '> li': {
              marginBottom: spacing
            }
          } as React.CSSProperties}
        >
          {items.map((item, index) => (
            <li 
              key={index}
              contentEditable={!!onUpdate}
              onFocus={() => setIsEditing(true)}
              onBlur={(e) => {
                setIsEditing(false);
                handleItemEdit(index, e.currentTarget.textContent || '');
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              suppressContentEditableWarning
              className="outline-none"
              style={{ marginBottom: index === items.length - 1 ? 0 : spacing }}
            >
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul 
          className="list-disc list-inside" 
          style={{ 
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 0,
            lineHeight: 1.5,
            '> li': {
              marginBottom: spacing
            }
          } as React.CSSProperties}
        >
          {items.map((item, index) => (
            <li 
              key={index}
              contentEditable={!!onUpdate}
              onFocus={() => setIsEditing(true)}
              onBlur={(e) => {
                setIsEditing(false);
                handleItemEdit(index, e.currentTarget.textContent || '');
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              suppressContentEditableWarning
              className="outline-none marker:text-[--bullet-color]"
              style={{ 
                '--bullet-color': bulletColor,
                marginBottom: index === items.length - 1 ? 0 : spacing 
              } as React.CSSProperties}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 