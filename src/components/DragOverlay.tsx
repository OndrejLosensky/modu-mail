import React from 'react';
import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { BlockType } from '@/types/blocks';

interface DragPreviewProps {
  icon: string;
  label: string;
}

const DragPreview: React.FC<DragPreviewProps> = ({ icon, label }) => {
  return (
    <div className="p-3 border-2 border-blue-500 rounded-lg bg-white shadow-lg w-64 opacity-90 transform-none">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-lg text-blue-600">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 font-medium">{label}</span>
          <span className="text-xs text-blue-500">Drop to add</span>
        </div>
      </div>
    </div>
  );
};

interface DragOverlayProps {
  draggedItem: { type: BlockType; icon: string; label: string; } | null;
}

export const DragOverlay: React.FC<DragOverlayProps> = ({ draggedItem }) => {
  return (
    <DndDragOverlay dropAnimation={null}>
      {draggedItem ? (
        <DragPreview 
          icon={draggedItem.icon} 
          label={draggedItem.label} 
        />
      ) : null}
    </DndDragOverlay>
  );
}; 