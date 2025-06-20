import React from 'react';
import { Block } from '@/types/blocks';
import { TextBlock } from './content/text/TextBlock';
import { ButtonBlock } from './interactive/button/ButtonBlock';
import { ImageBlock } from './media/image/ImageBlock';
import { DividerBlock } from './content/divider/DividerBlock';
import { SpacerBlock } from './content/spacer/SpacerBlock';
import { SocialBlock } from './interactive/social/SocialBlock';
import { ListBlock } from './content/list/ListBlock';

interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  onUpdate?: (block: Block) => void;
  onClick?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isSelected, onUpdate, onClick }) => {
  switch (block.type) {
    case 'text':
      return <TextBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    case 'button':
      return <ButtonBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    case 'image':
      return <ImageBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    case 'divider':
      return <DividerBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    case 'spacer':
      return <SpacerBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    case 'social':
      return <SocialBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    case 'list':
      return <ListBlock block={block} isSelected={isSelected} onUpdate={onUpdate} onClick={onClick} />;
    default:
      return null;
  }
}; 