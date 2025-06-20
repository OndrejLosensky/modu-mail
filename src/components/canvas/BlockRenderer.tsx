import React from 'react';
import { Block, BlockComponentProps } from '@/types/blocks';
import { TextBlock } from '@/blocks/content/text/TextBlock';
import { ButtonBlock } from '@/blocks/interactive/button/ButtonBlock';
import { ImageBlock } from '@/blocks/media/image/ImageBlock';
import { DividerBlock } from '@/blocks/content/divider/DividerBlock';
import { SpacerBlock } from '@/blocks/content/spacer/SpacerBlock';
import { SocialBlock } from '@/blocks/interactive/social/SocialBlock';
import { ListBlock } from '@/blocks/content/list/ListBlock';

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onClick: () => void;
  onUpdate: (block: Block) => void;
  isPreview?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onClick,
  onUpdate,
  isPreview = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isPreview) {
      e.stopPropagation();
      onClick();
    }
  };

  const renderBlock = () => {
    const blockProps: BlockComponentProps = {
      block,
      isSelected,
      onUpdate: (updatedBlock) => onUpdate(updatedBlock),
      onClick: handleClick,
      isPreview,
    };

    switch (block.type) {
      case 'text':
        return <TextBlock {...blockProps} />;
      case 'button':
        return <ButtonBlock {...blockProps} />;
      case 'image':
        return <ImageBlock {...blockProps} />;
      case 'divider':
        return <DividerBlock {...blockProps} />;
      case 'spacer':
        return <SpacerBlock {...blockProps} />;
      case 'social':
        return <SocialBlock {...blockProps} />;
      case 'list':
        return <ListBlock {...blockProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative group cursor-pointer
        ${isSelected && !isPreview ? 'ring-2 ring-blue-500 rounded-lg' : ''}
      `}
    >
      {renderBlock()}
      {isSelected && !isPreview && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
          {block.type}
        </div>
      )}
      {!isSelected && !isPreview && (
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors duration-200" />
      )}
    </div>
  );
}; 