import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Block } from '@/types/blocks';

interface EmailCanvasProps {
  blocks: Block[];
  onSelectBlock: (block: Block) => void;
  selectedBlock: Block | null;
  isDragging?: boolean;
}

export const EmailCanvas: React.FC<EmailCanvasProps> = ({ 
  blocks, 
  onSelectBlock,
  selectedBlock,
  isDragging = false
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-canvas',
  });

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Email Canvas</h1>
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
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div 
                    key={block.id} 
                    onClick={() => onSelectBlock(block)}
                    className={`
                      p-4 border rounded cursor-pointer transition-all
                      ${selectedBlock?.id === block.id 
                        ? 'bg-blue-50 border-blue-500 shadow-sm' 
                        : 'bg-white hover:border-gray-400 hover:shadow-sm'
                      }
                    `}
                  >
                    <span className="text-gray-900 font-medium">{block.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 