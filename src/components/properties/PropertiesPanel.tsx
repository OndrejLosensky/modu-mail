import React from 'react';
import { Block } from '@/types/blocks';
import { PropertyRenderer } from './PropertyRenderer';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdateBlock?: (block: Block) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedBlock,
  onUpdateBlock = () => {}
}) => {
  const renderEmptyState = () => (
    <div className="w-72 border-l bg-white h-full overflow-y-auto">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Properties</h2>
      </div>
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">No Block Selected</h3>
        <p className="text-sm text-gray-500">Select a block from the canvas or drag a new component to get started.</p>
      </div>
    </div>
  );

  if (!selectedBlock) {
    return renderEmptyState();
  }

  return (
    <div className="w-72 border-l bg-white h-full overflow-y-auto">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Properties</h2>
      </div>
      <div className="p-4">
        <PropertyRenderer block={selectedBlock} onUpdateBlock={onUpdateBlock} />
      </div>
    </div>
  );
}; 