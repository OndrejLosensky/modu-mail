import React from 'react';
import { Block } from '@/types/blocks';
import { PropertyRenderer } from './PropertyRenderer';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdateBlock?: (block: Block) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlock,
  onUpdateBlock = () => {},
}) => {
  return (
    <div className="w-80 border-l bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        </div>
      </div>

      {selectedBlock && (
        <div className="flex-1 overflow-y-auto p-4">
          <PropertyRenderer block={selectedBlock} onUpdateBlock={onUpdateBlock} />
        </div>
      )}
    </div>
  );
}; 