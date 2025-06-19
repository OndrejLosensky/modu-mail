import React from 'react';
import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { Block } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';

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
    <DndDragOverlay dropAnimation={null}>
      {draggedBlock ? (
        <div className="w-[calc(100%-2.5rem)] opacity-50">
          <BlockRenderer
            block={draggedBlock}
            isSelected={false}
            onUpdate={() => {}}
            onClick={() => {}}
          />
        </div>
      ) : draggedComponent ? (
        <div className="w-64 p-3 border rounded-lg bg-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-50 text-lg text-gray-700">
              {draggedComponent.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-900 font-medium">{draggedComponent.label}</span>
            </div>
          </div>
        </div>
      ) : null}
    </DndDragOverlay>
  );
}; 