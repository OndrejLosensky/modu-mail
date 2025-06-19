import React, { useState } from 'react';
import { BlockComponentProps, TextBlockProps } from '@/types/blocks';

export const TextBlock: React.FC<BlockComponentProps> = ({ 
  block, 
  isSelected = false, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Type assertion to get the specific text props
  const props = block.props as TextBlockProps;
  const { 
    text = 'New text block',
    fontSize = '16px',
    color = '#1f2937',
    textAlign = 'left'
  } = props;

  const handleDoubleClick = () => {
    if (onUpdate) {
      setIsEditing(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    if (onUpdate) {
      onUpdate({
        ...block,
        props: {
          ...block.props,
          text: e.target.textContent || 'New text block'
        }
      });
    }
  };

  return (
    <div 
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      suppressContentEditableWarning
      style={{
        fontSize,
        color,
        textAlign,
        cursor: onUpdate ? 'text' : 'default'
      }}
      className={`
        p-4 outline-none transition-all
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isEditing ? 'bg-blue-50/50' : ''}
      `}
    >
      {text}
    </div>
  );
}; 