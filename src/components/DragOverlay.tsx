import React from 'react';
import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { Block } from '@/types/blocks';
import { BlockRenderer } from './blocks/BlockRenderer';

interface DragOverlayProps {
  draggedBlock?: Block;
  draggedComponent?: {
    type: string;
    icon: string;
    label: string;
  };
}

export const DragOverlay: React.FC<DragOverlayProps> = ({
  draggedBlock,
  draggedComponent,
}) => {
  if (!draggedBlock && !draggedComponent) return null;

  return (
    <DndDragOverlay>
      {draggedBlock ? (
        <div className="w-[calc(100%-2.5rem)] opacity-75">
          <BlockRenderer
            block={draggedBlock}
            isSelected={false}
            onUpdate={() => {}}
            onClick={() => {}}
          />
        </div>
      ) : draggedComponent ? (
        <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-blue-500 flex items-center gap-2">
          <span className="text-2xl">{draggedComponent.icon}</span>
          <span className="text-sm font-medium">{draggedComponent.label}</span>
        </div>
      ) : null}
    </DndDragOverlay>
  );
}; 