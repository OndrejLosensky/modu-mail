import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, ListBlockProps, SpacerBlockProps, SocialBlockProps } from '@/types/blocks';
import { StyleGenerator } from '@/config/blocks/types';

export const textBlockStyles: StyleGenerator<TextBlockProps> = (block: Block<TextBlockProps>) => {
  const { fontSize = '16px', color = '#000000', textAlign = 'left', fontWeight = '400' } = block.props;
  
  return {
    margin: '0',
    padding: '0',
    fontSize,
    color,
    textAlign,
    fontWeight,
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };
};

export const buttonBlockStyles: StyleGenerator<ButtonBlockProps> = () => {
  return {
    width: '100%',
    borderCollapse: 'collapse',
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
  };
};

export const imageBlockStyles: StyleGenerator<ImageBlockProps> = () => {
  return {
    width: '100%',
    margin: '0',
    padding: '0',
    borderCollapse: 'collapse',
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
  };
};

export const dividerBlockStyles: StyleGenerator<DividerBlockProps> = (block: Block<DividerBlockProps>) => {
  const { color = '#e5e7eb', height = '1px', style = 'solid' } = block.props;

  return {
    display: 'block',
    width: '100%',
    borderTop: `${height} ${style} ${color}`,
    margin: '16px 0',
    backgroundColor: 'transparent',
    border: 'none',
  };
};

export const listBlockStyles: StyleGenerator<ListBlockProps> = (block: Block<ListBlockProps>) => {
  const { 
    fontSize = '16px', 
    color = '#1f2937',
    textAlign = 'left'
  } = block.props;
  
  return {
    fontSize,
    color,
    textAlign,
    margin: '0',
    padding: '0',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
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