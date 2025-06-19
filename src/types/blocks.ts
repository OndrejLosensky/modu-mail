export type BlockType = 'text' | 'image' | 'button' | 'divider';

export interface BlockProps {
  text?: string;
  href?: string;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface Block {
  id: string;
  type: BlockType;
  props: BlockProps;
}

export interface EmailTemplate {
  blocks: Block[];
} 