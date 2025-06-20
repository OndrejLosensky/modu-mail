import React from 'react';
import { Block } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: Block[];
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isOpen,
  onClose,
  blocks,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Email Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-2xl mx-auto space-y-4">
            {blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                isSelected={false}
                onClick={() => {}}
                onUpdate={() => {}}
                isPreview={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 