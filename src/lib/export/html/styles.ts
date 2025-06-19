import { TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps } from '@/types/blocks';
import { StyleGenerator } from './types';
import { Block } from '@/types/blocks';

export const textBlockStyles: StyleGenerator<TextBlockProps> = (block: Block<TextBlockProps>) => {
  const { fontSize = '16px', color = '#000000', textAlign = 'left' } = block.props;
  
  return {
    margin: '0',
    padding: '0',
    fontSize,
    color,
    textAlign,
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };
};

export const buttonBlockStyles: StyleGenerator<ButtonBlockProps> = (block: Block<ButtonBlockProps>) => {
  const { fontSize = '16px', color = '#ffffff', backgroundColor = '#3b82f6', textAlign = 'center' } = block.props as ButtonBlockProps & { textAlign?: string };

  return {
    display: 'inline-block',
    padding: '12px 24px',
    margin: '8px 0',
    fontSize,
    color,
    backgroundColor,
    textAlign,
    textDecoration: 'none',
    borderRadius: '6px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  };
};

export const imageBlockStyles: StyleGenerator<ImageBlockProps> = (block: Block<ImageBlockProps>) => {
  const { width = '100%', height = 'auto' } = block.props;
  
  return {
    display: 'block',
    maxWidth: width,
    height,
    margin: '8px 0',
  };
};

export const dividerBlockStyles: StyleGenerator<DividerBlockProps> = (block: Block<DividerBlockProps>) => {
  const { color = '#e5e7eb', height = '1px' } = block.props;

  return {
    display: 'block',
    width: '100%',
    height,
    margin: '16px 0',
    backgroundColor: color,
    border: 'none',
  };
}; 