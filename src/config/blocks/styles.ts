import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, ListBlockProps, SpacerBlockProps, SocialBlockProps } from '@/types/blocks';
import { StyleGenerator } from '@/config/blocks/types';

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
  const { textColor: color = '#ffffff', backgroundColor = '#3b82f6', align: textAlign = 'center' } = block.props;

  return {
    display: 'inline-block',
    padding: '12px 24px',
    margin: '8px 0',
    fontSize: '16px',
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
  const { color = '#e5e7eb', spacing = '1px' } = block.props;

  return {
    display: 'block',
    width: '100%',
    height: spacing,
    margin: '16px 0',
    backgroundColor: color,
    border: 'none',
  };
};

export const listBlockStyles: StyleGenerator<ListBlockProps> = (block: Block<ListBlockProps>) => {
  const { fontSize = '16px', color = '#1f2937' } = block.props;
  
  return {
    fontSize,
    color,
    textAlign: 'left',
    margin: '0',
    padding: '0',
    lineHeight: '1.5',
  };
};

export const spacerBlockStyles: StyleGenerator<SpacerBlockProps> = (block: Block<SpacerBlockProps>) => {
  const { height = '20px' } = block.props;
  
  return {
    display: 'block',
    height,
    width: '100%',
    margin: '0',
    padding: '0',
    fontSize: '1px',
    lineHeight: '1px'
  };
};

export const socialBlockStyles: StyleGenerator<SocialBlockProps> = (block: Block<SocialBlockProps>) => {
  const { alignment = 'center' } = block.props;
  
  return {
    display: 'table',
    width: '100%',
    textAlign: alignment,
    padding: '10px 0'
  };
};

export const socialIconStyles = (iconSize: string, spacing: string): Record<string, string> => {
  return {
    display: 'inline-block',
    width: iconSize || '24px',
    height: iconSize || '24px',
    margin: `0 ${spacing || '16px'}`,
    verticalAlign: 'middle'
  };
};

export const columnStyles = (ratio: string, spacing: string, verticalAlignment: string): Record<string, string> => {
  const [left, right] = ratio.split(':').map(Number);
  const totalParts = left + right;
  const leftWidth = `${(left / totalParts) * 100}%`;

  return {
    display: 'table-cell',
    width: leftWidth,
    padding: spacing || '10px',
    verticalAlign: verticalAlignment || 'top'
  };
}; 