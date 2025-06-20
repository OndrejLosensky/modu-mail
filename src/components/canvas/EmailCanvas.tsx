import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';
import { SortableBlockWrapper } from './SortableBlockWrapper';
import { useBlocksStore } from '@/lib/store/blocks';
import { useGroupsStore } from '@/lib/store/groups';

interface EmailCanvasProps {
  blocks: Block[];
  onSelectBlock: (block: Block | null) => void;
  selectedBlock: Block | null;
  isDragging?: boolean;
  onUpdateBlock: (block: Block) => void;
}

export const EmailCanvas: React.FC<EmailCanvasProps> = ({ 
  blocks, 
  onSelectBlock,
  selectedBlock,
  isDragging = false,
  onUpdateBlock,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-canvas',
  });

  const [newBlockId, setNewBlockId] = useState<string | null>(null);
  const deleteBlock = useBlocksStore((state) => state.deleteBlock);
  const duplicateBlock = useBlocksStore((state) => state.duplicateBlock);
  const { selectedBlocks, setSelectedBlocks, createGroup } = useGroupsStore();

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

  const handleBlockClick = (block: Block) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.shiftKey) {
      if (selectedBlocks.includes(block.id)) {
        setSelectedBlocks(selectedBlocks.filter(id => id !== block.id));
      } else {
        setSelectedBlocks([...selectedBlocks, block.id]);
      }
    } else {
      setSelectedBlocks([]);
      onSelectBlock(block);
    }
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Group blocks with Cmd/Ctrl + G
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') {
        e.preventDefault();
        if (selectedBlocks.length >= 2) {
          createGroup();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBlocks, createGroup]);

  return (
    <div className="flex-1 bg-gray-100 p-8 h-full overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Email Canvas</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {blocks.length} {blocks.length === 1 ? 'component' : 'components'}
            </div>
            {selectedBlocks.length >= 2 && (
              <button
                onClick={() => createGroup()}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:text-blue-500 hover:border-blue-500 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9.4V4.6C4 4.26863 4.26863 4 4.6 4H9.4C9.73137 4 10 4.26863 10 4.6V9.4C10 9.73137 9.73137 10 9.4 10H4.6C4.26863 10 4 9.73137 4 9.4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 9.4V4.6C14 4.26863 14.2686 4 14.6 4H19.4C19.7314 4 20 4.26863 20 4.6V9.4C20 9.73137 19.7314 10 19.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 19.4V14.6C4 14.2686 4.26863 14 4.6 14H9.4C9.73137 14 10 14.2686 10 14.6V19.4C10 19.7314 9.73137 20 9.4 20H4.6C4.26863 20 4 19.7314 4 19.4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 19.4V14.6C14 14.2686 14.2686 14 14.6 14H19.4C19.7314 14 20 14.2686 20 14.6V19.4C20 19.7314 19.7314 20 19.4 20H14.6C14.2686 20 14 19.7314 14 19.4Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Group Blocks
              </button>
            )}
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
                  <div className="space-y-4">
                    {blocks.map((block) => (
                      <SortableBlockWrapper 
                        key={block.id} 
                        id={block.id}
                        onDelete={handleDeleteBlock}
                        onDuplicate={handleDuplicateBlock}
                        isDuplicate={block.isDuplicate}
                        isNew={block.id === newBlockId}
                        isSelected={selectedBlocks.includes(block.id) || selectedBlock?.id === block.id}
                      >
                        <BlockRenderer
                          block={block}
                          isSelected={selectedBlocks.includes(block.id) || selectedBlock?.id === block.id}
                          onUpdate={onUpdateBlock}
                          onClick={handleBlockClick(block)}
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