export type BlockType = 'text' | 'button' | 'image' | 'divider' | 'spacer' | 'social' | 'columns' | 'list' | 'container' | 'group';

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
  text: string;
  content?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  lineHeight?: string;
}

export interface ButtonBlockProps {
  text: string;
  url: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  width?: 'auto' | 'full';
  align?: 'left' | 'center' | 'right';
  paddingX?: string;
  paddingY?: string;
}

export interface ImageBlockProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  align?: string;
}

export interface DividerBlockProps {
  color?: string;
  width?: string;
  height?: string;
  style?: string;
  alignment?: TextAlignment;
}

export interface ContainerBlockProps extends CommonBlockProps {
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  align?: TextAlignment;
  [key: string]: unknown;
}

export interface ListBlockProps {
  items: string[];
  listType?: 'ordered' | 'unordered';
  color?: string;
  fontSize?: string;
  textAlign?: TextAlignment;
  spacing?: string;
  bulletColor?: string;
}

export interface SpacerBlockProps {
  height: string;
}

export interface SocialNetwork {
  platform: string;
  url: string;
}

export interface SocialBlockProps {
  networks: SocialNetwork[];
  iconSize?: string;
  spacing?: string;
  alignment?: 'left' | 'center' | 'right';
  iconColor?: string;
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

export interface Block<T = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | SpacerBlockProps | SocialBlockProps | ListBlockProps> {
  id: string;
  type: string;
  props: T;
  isDuplicate?: boolean;
}

export interface EmailTemplate {
  blocks: Block[];
}

// Common props for all block components
export interface BlockComponentProps {
  block: Block;
  isSelected?: boolean;
  onUpdate?: (block: Block) => void;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children?: React.ReactNode;
} 