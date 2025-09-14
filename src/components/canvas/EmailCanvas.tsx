import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';
import { SortableBlockWrapper } from './SortableBlockWrapper';
import { useBlocksStore } from '@/lib/store/blocks';

interface EmailCanvasProps {
  blocks: Block[];
  onSelectBlock: (block: Block | null) => void;
  selectedBlock: Block | null;
  isDragging?: boolean;
  onUpdateBlock: (block: Block) => void;
  isPreview?: boolean;
}

export const EmailCanvas: React.FC<EmailCanvasProps> = ({ 
  blocks, 
  onSelectBlock,
  selectedBlock,
  isDragging = false,
  onUpdateBlock,
  isPreview = false,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-canvas',
  });

  const [newBlockId, setNewBlockId] = useState<string | null>(null);
  const deleteBlock = useBlocksStore((state) => state.deleteBlock);
  const duplicateBlock = useBlocksStore((state) => state.duplicateBlock);

  const handleDeleteBlock = (blockId: string) => {
    if (selectedBlock?.id === blockId) {
      onSelectBlock(null);
    }
    deleteBlock(blockId);
  };

  const handleDuplicateBlock = (blockId: string) => {
    const newId = duplicateBlock(blockId);
    if (newId) {
      const duplicatedBlock = blocks.find(block => block.id === newId);
      if (duplicatedBlock) {
        onSelectBlock(duplicatedBlock);
        setNewBlockId(newId);
        // Clear the new block indicator after animation
        setTimeout(() => {
          setNewBlockId(null);
        }, 1000);
      }
    }
  };

  const handleBlockClick = (block: Block) => () => {
    onSelectBlock(block);
  };

  return (
    <div className={`flex-1 bg-gray-100 p-4 h-full overflow-auto ${isPreview ? 'bg-gray-900' : ''}`}>
      <div className="max-w-xl mx-auto">
        {!isPreview && (
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Email Canvas</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {blocks.length} {blocks.length === 1 ? 'component' : 'components'}
              </div>
            </div>
          </div>
        )}

        <div className={`bg-white rounded-lg shadow-sm ${isPreview ? 'max-w-xl mx-auto' : ''}`}>
          {!isPreview && (
            <div className="px-6 py-3 border-b border-gray-100">
              <div className="w-32 h-2 bg-gray-100 rounded-full" />
            </div>
          )}

          <div className={`${isPreview ? 'p-4' : 'p-6'}`}>
            <div 
              ref={setNodeRef}
              className={`
                min-h-[200px] rounded-lg p-3 transition-all duration-200
                ${isDragging ? 'border-2 border-dashed' : isPreview ? '' : 'border'}
                ${isOver 
                  ? 'border-blue-500 bg-blue-50/50' 
                  : isDragging 
                    ? 'border-gray-300 bg-gray-50/50' 
                    : 'border-gray-200'
                }
              `}
            >
              {blocks.length === 0 ? (
                <div className={`
                  h-full flex flex-col items-center justify-center gap-2
                  ${isDragging ? 'opacity-100' : 'opacity-80'}
                `}>
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className={`w-8 h-8 ${isOver ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className={`text-sm font-medium ${isOver ? 'text-blue-500' : 'text-gray-500'}`}>
                    {isOver ? 'Drop to add' : 'Drag components here'}
                  </span>
                </div>
              ) : (
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {blocks.map((block) => (
                      <SortableBlockWrapper 
                        key={block.id} 
                        id={block.id}
                        onDelete={handleDeleteBlock}
                        onDuplicate={handleDuplicateBlock}
                        isDuplicate={block.isDuplicate}
                        isNew={block.id === newBlockId}
                        isSelected={selectedBlock?.id === block.id}
                        isPreview={isPreview}
                      >
                        <BlockRenderer
                          block={block}
                          isSelected={selectedBlock?.id === block.id}
                          onUpdate={onUpdateBlock}
                          onClick={handleBlockClick(block)}
                          isPreview={isPreview}
                        />
                      </SortableBlockWrapper>
                    ))}
                  </div>
                </SortableContext>
              )}
            </div>
          </div>

          {!isPreview && (
            <div className="px-8 py-4 border-t border-gray-100">
              <div className="w-24 h-2 bg-gray-100 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 