import React, { useState } from 'react';
import { BlockComponentProps, TextBlockProps, TextAlignment } from '@/types/blocks';

export const TextBlock: React.FC<BlockComponentProps> = ({ 
  block, 
  isSelected = false, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Type assertion to get the specific text props
  const props = block.props as TextBlockProps;
  const { 
    content = 'New text block',
    fontSize = '16px',
    color = '#1f2937',
    textAlign = 'left',
    thickness = '400'
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
          content: e.target.innerText || 'New text block'
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const br = document.createElement('br');
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // Convert line breaks to <br> tags for display
  const formattedContent = content.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div 
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      style={{
        fontSize,
        color,
        textAlign: textAlign as TextAlignment,
        fontWeight: thickness as string,
        whiteSpace: 'pre-wrap',
        cursor: onUpdate ? 'text' : 'default'
      }}
      className={`
        p-4 outline-none transition-all
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isEditing ? 'bg-blue-50/50' : ''}
      `}
    >
      {isEditing ? content : formattedContent}
    </div>
  );
}; 