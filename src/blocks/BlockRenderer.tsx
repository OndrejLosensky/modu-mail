import React from 'react';
import { Block, GroupBlockProps } from '@/types/blocks';
import { TextBlock } from './content/text/TextBlock';
import { ButtonBlock } from './interactive/button/ButtonBlock';
import { ImageBlock } from './media/image/ImageBlock';
import { DividerBlock } from './content/divider/DividerBlock';
import { SpacerBlock } from './content/spacer/SpacerBlock';
import { SocialBlock } from './interactive/social/SocialBlock';
import { ListBlock } from './content/list/ListBlock';
import { GroupBlock } from './content/group/GroupBlock';

interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  onUpdate?: (block: Block) => void;
  onClick?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onUpdate,
  onClick,
}) => {
  const commonProps = {
    isSelected,
    onUpdate,
    onClick,
  };

  switch (block.type) {
    case 'text':
      return <TextBlock block={block} {...commonProps} />;
    case 'button':
      return <ButtonBlock block={block} {...commonProps} />;
    case 'image':
      return <ImageBlock block={block} {...commonProps} />;
    case 'divider':
      return <DividerBlock block={block} {...commonProps} />;
    case 'spacer':
      return <SpacerBlock block={block} {...commonProps} />;
    case 'social':
      return <SocialBlock block={block} {...commonProps} />;
    case 'list':
      return <ListBlock block={block} {...commonProps} />;
    case 'group':
      return <GroupBlock block={block as Block<GroupBlockProps>} {...commonProps} />;
    default:
      return null;
  }
}; 