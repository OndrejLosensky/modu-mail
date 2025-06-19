import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export type BlockType = 'text' | 'image' | 'button' | 'divider' | 'container' | 'list';

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';
export type BorderStyle = 'solid' | 'dashed' | 'dotted';
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface CommonBlockProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface TextBlockProps extends CommonBlockProps {
  text: string;
  fontSize?: string;
  color?: string;
  textAlign?: TextAlignment;
}

export interface ButtonBlockProps extends CommonBlockProps {
  text: string;
  href: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  align?: TextAlignment;
  border?: string;
}

export interface ImageBlockProps extends CommonBlockProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: ObjectFit;
  borderRadius?: string;
  align?: TextAlignment;
}

export interface DividerBlockProps extends CommonBlockProps {
  color?: string;
  height?: string;
  width?: string;
  borderStyle?: BorderStyle;
  margin?: string;
}

export interface ContainerBlockProps extends CommonBlockProps {
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  align?: TextAlignment;
}

export interface ListBlockProps extends CommonBlockProps {
  items: string[];
  listType: 'ordered' | 'unordered';
  fontSize?: string;
  color?: string;
  textAlign?: TextAlignment;
  bulletColor?: string;
  spacing?: string;
}

export type BlockProps = 
  | TextBlockProps 
  | ButtonBlockProps 
  | ImageBlockProps 
  | DividerBlockProps 
  | ContainerBlockProps
  | ListBlockProps;

export interface Block {
  id: string;
  type: BlockType;
  category?: ComponentCategory;
  props: BlockProps;
}

export interface EmailTemplate {
  blocks: Block[];
}

// Common props for all block components
export interface BlockComponentProps {
  block: Block;
  isSelected?: boolean;
  onUpdate?: (block: Block) => void;
  children?: React.ReactNode;
} 