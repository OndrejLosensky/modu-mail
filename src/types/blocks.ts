export type BlockType = 'text' | 'button' | 'image' | 'divider' | 'spacer' | 'social' | 'columns' | 'list' | 'container';

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';
export type ListType = 'ordered' | 'unordered';
export type VerticalAlignment = 'top' | 'middle' | 'bottom';
export type BorderStyle = 'solid' | 'dashed' | 'dotted';
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface CommonBlockProps {
  id?: string;
  className?: string;
  style?: Record<string, string>;
}

export interface TextBlockProps {
  content: string;
  fontSize?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: string;
  [key: string]: unknown;
}

export interface ButtonBlockProps {
  text: string;
  href: string;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  [key: string]: unknown;
}

export interface ImageBlockProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  [key: string]: unknown;
}

export interface DividerBlockProps {
  color?: string;
  height?: string;
  [key: string]: unknown;
}

export interface ContainerBlockProps extends CommonBlockProps {
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  align?: TextAlignment;
  [key: string]: unknown;
}

export interface ListBlockProps extends CommonBlockProps {
  items: string[];
  listType: ListType;
  fontSize?: string;
  color?: string;
  textAlign?: TextAlignment;
  bulletColor?: string;
  spacing?: string;
  [key: string]: unknown;
}

export interface SpacerBlockProps {
  height: string;
  [key: string]: unknown;
}

export interface SocialNetwork {
  platform: string;
  url: string;
  [key: string]: unknown;
}

export interface SocialBlockProps {
  networks: SocialNetwork[];
  iconSize?: string;
  spacing?: string;
  alignment?: string;
  [key: string]: unknown;
}



export type BlockProps = 
  | TextBlockProps 
  | ButtonBlockProps 
  | ImageBlockProps 
  | DividerBlockProps 
  | ContainerBlockProps
  | ListBlockProps
  | SpacerBlockProps
  | SocialBlockProps;

export interface Block<T = Record<string, unknown>> {
  id: string;
  type: BlockType;
  props: T;
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