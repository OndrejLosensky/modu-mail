import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps, ListBlockProps } from '@/types/blocks';
import { BlockRenderer } from '@/blocks/BlockRenderer';

type BlockProps = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | SpacerBlockProps | SocialBlockProps | ListBlockProps;

interface SortableBlockProps {
  block: Block<BlockProps>;
  isSelected?: boolean;
  onUpdate?: (block: Block<BlockProps>) => void;
  onClick?: () => void;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({ block, isSelected, onUpdate, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
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
    >
      <BlockRenderer
        block={block}
        isSelected={isSelected}
        onUpdate={onUpdate}
        onClick={onClick}
      />
    </div>
  );
}; 