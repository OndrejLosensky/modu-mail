import React, { useState } from 'react';
import { BlockComponentProps, TextBlockProps, TextAlignment } from '@/types/blocks';

export const TextBlock: React.FC<BlockComponentProps> = ({ 
  block, 
  isSelected = false, 
  onUpdate,
  onClick
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Get the text props
  const props = block.props as TextBlockProps;
  const { 
    text,
    fontSize = '16px',
    color = '#1f2937',
    textAlign = 'left',
    fontWeight = '400'
  } = props;

  const handleDoubleClick = () => {
    if (onUpdate) {
      setIsEditing(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    if (onUpdate) {
      const newText = e.target.innerText;
      if (!newText) return; // Don't update if empty

      onUpdate({
        ...block,
        props: {
          ...props,
          text: newText
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
  const formattedText = (text || '').split('\n').map((line: string, i: number, arr: string[]) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div 
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onClick={onClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      style={{
        fontSize,
        color,
        textAlign: textAlign as TextAlignment,
        fontWeight,
        whiteSpace: 'pre-wrap',
        cursor: onUpdate ? 'text' : 'default'
      }}
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-200'}
      `}
    >
      {isEditing ? text : formattedText}
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 