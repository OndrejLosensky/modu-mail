import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps, ColumnsBlockProps } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';

type BlockProps = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | SpacerBlockProps | SocialBlockProps | ColumnsBlockProps;

interface SortableBlockProps {
  block: Block<BlockProps>;
  isSelected?: boolean;
  onSelect: (block: Block<BlockProps>) => void;
}

export function SortableBlock({ block, isSelected, onSelect }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative"
    >
      <BlockRenderer
        block={block}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    </div>
  );
} 