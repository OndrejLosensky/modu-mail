import React from 'react';
import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps, ColumnsBlockProps } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';

type BlockProps = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | SpacerBlockProps | SocialBlockProps | ColumnsBlockProps;

interface DragOverlayProps {
  draggedBlock?: Block<BlockProps>;
  draggedComponent?: {
    type: string;
    icon: string;
    label: string;
  };
}

export function DragOverlay({ draggedBlock, draggedComponent }: DragOverlayProps) {
  if (!draggedBlock && !draggedComponent) return null;

  return (
    <DndDragOverlay>
      {draggedBlock ? (
        <div className="opacity-50 pointer-events-none">
          <BlockRenderer
            block={draggedBlock}
            isSelected={false}
            onUpdate={() => {}}
            onClick={() => {}}
          />
        </div>
      ) : draggedComponent ? (
        <div className="bg-white rounded-lg shadow-lg p-4 opacity-50 pointer-events-none">
          <span className="material-icons">{draggedComponent.icon}</span>
          <span className="ml-2">{draggedComponent.label}</span>
        </div>
      ) : null}
    </DndDragOverlay>
  );
} 