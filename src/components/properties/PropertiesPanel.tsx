import React from 'react';
import { Block } from '@/types/blocks';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedBlock }) => {
  return (
    <div className="w-80 border-l bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Properties</h2>
        <div className="text-xs text-gray-600">
          {selectedBlock ? selectedBlock.type : '3 components'}
        </div>
      </div>
      
      {!selectedBlock ? (
        <div className="text-sm text-gray-500 text-center mt-8 font-medium">
          Select a component to edit its properties
        </div>
      ) : (
        <div className="space-y-4">
          {/* We'll add property editors here later */}
          <div className="text-sm text-gray-700 font-medium">
            Editing {selectedBlock.type} block
          </div>
        </div>
      )}
    </div>
  );
}; 