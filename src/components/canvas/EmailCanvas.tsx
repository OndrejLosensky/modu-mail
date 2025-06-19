import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types/blocks';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { SortableBlockWrapper } from './SortableBlockWrapper';

interface EmailCanvasProps {
  blocks: Block[];
  onSelectBlock: (block: Block) => void;
  selectedBlock: Block | null;
  isDragging?: boolean;
  onUpdateBlock: (block: Block) => void;
  onReorderBlocks?: (blocks: Block[]) => void;
}

export const EmailCanvas: React.FC<EmailCanvasProps> = ({ 
  blocks, 
  onSelectBlock,
  selectedBlock,
  isDragging = false,
  onUpdateBlock,
  onReorderBlocks
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-canvas',
  });

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Email Canvas</h1>
          <div className="text-sm text-gray-500">
            {blocks.length} {blocks.length === 1 ? 'component' : 'components'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-8 py-4 border-b border-gray-100">
            <div className="w-32 h-2 bg-gray-100 rounded-full" />
          </div>

          <div className="p-8">
            <div 
              ref={setNodeRef}
              className={`
                min-h-[400px] rounded-lg p-4 transition-all duration-200
                ${isDragging ? 'border-2 border-dashed' : 'border'}
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
                  <div className="space-y-1">
                    {blocks.map((block) => (
                      <SortableBlockWrapper
                        key={block.id}
                        id={block.id}
                      >
                        <BlockRenderer
                          block={block}
                          isSelected={selectedBlock?.id === block.id}
                          onUpdate={onUpdateBlock}
                          onClick={() => onSelectBlock(block)}
                        />
                      </SortableBlockWrapper>
                    ))}
                  </div>
                </SortableContext>
              )}
            </div>
          </div>

          <div className="px-8 py-4 border-t border-gray-100">
            <div className="w-24 h-2 bg-gray-100 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}; 