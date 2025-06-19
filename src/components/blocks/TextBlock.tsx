import React, { useState } from 'react';
import { Block } from '@/types/blocks';

interface TextBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ block, isSelected, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const text = block.props.text || 'New text block';

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    onUpdate({
      ...block,
      props: {
        ...block.props,
        text: e.target.textContent || 'New text block'
      }
    });
  };

  return (
    <div 
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      suppressContentEditableWarning
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