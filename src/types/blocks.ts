export type BlockType = 'text' | 'image' | 'button' | 'divider';

export interface BlockProps {
  text?: string;
  href?: string;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  borderWidth?: string;
  height?: string;
}

export interface Block {
  id: string;
  type: BlockType;
  props: BlockProps;
}

export interface EmailTemplate {
  blocks: Block[];
} 