import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Block } from '@/types/blocks';
import { BlockRenderer } from './BlockRenderer';

interface CanvasProps {
  blocks: Block[];
  selectedBlock: Block | null;
  onBlockSelect: (block: Block | null) => void;
  onBlockUpdate: (block: Block) => void;
  isPreview?: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
  blocks,
  selectedBlock,
  onBlockSelect,
  onBlockUpdate,
  isPreview = false,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`min-h-full p-8 ${isPreview ? 'pointer-events-none' : ''}`}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isSelected={selectedBlock?.id === block.id}
            onClick={() => !isPreview && onBlockSelect(block)}
            onUpdate={onBlockUpdate}
            isPreview={isPreview}
          />
        ))}
        {blocks.length === 0 && !isPreview && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Drag and drop components here</p>
          </div>
        )}
      </div>
    </div>
  );
}; 