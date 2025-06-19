import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Block } from '@/types/blocks';

interface EmailCanvasProps {
  blocks: Block[];
  onSelectBlock: (block: Block) => void;
  selectedBlock: Block | null;
}

export const EmailCanvas: React.FC<EmailCanvasProps> = ({ 
  blocks, 
  onSelectBlock,
  selectedBlock 
}) => {
  const { setNodeRef } = useDroppable({
    id: 'email-canvas',
  });

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Email Canvas</h1>
          <div 
            ref={setNodeRef}
            className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4"
          >
            {blocks.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 font-medium">
                Drag components here to build your email
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div 
                    key={block.id} 
                    onClick={() => onSelectBlock(block)}
                    className={`p-4 border rounded cursor-pointer transition-all ${
                      selectedBlock?.id === block.id 
                        ? 'bg-blue-50 border-blue-500 shadow-sm' 
                        : 'bg-white hover:border-gray-400 hover:shadow-sm'
                    }`}
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