import { Block } from '@/types/blocks';
import { StyleGenerator } from './types';

export const textBlockStyles: StyleGenerator = (block: Block) => {
  const { fontSize, color, textAlign } = block.props;
  
  return {
    margin: '0',
    padding: '0',
    fontSize: fontSize || '16px',
    color: color || '#000000',
    textAlign: textAlign || 'left',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };
};

export const buttonBlockStyles: StyleGenerator = (block: Block) => {
  const { fontSize, color, backgroundColor, textAlign } = block.props;

  return {
    display: 'inline-block',
    padding: '12px 24px',
    margin: '8px 0',
    fontSize: fontSize || '16px',
    color: color || '#ffffff',
    backgroundColor: backgroundColor || '#3b82f6',
    textAlign: textAlign || 'center',
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

export const imageBlockStyles: StyleGenerator = (block: Block) => {
  const { maxWidth = '100%', margin = '8px 0' } = block.props;
  
  return {
    display: 'block',
    maxWidth,
    height: 'auto',
    margin,
  };
};

export const dividerBlockStyles: StyleGenerator = (block: Block) => {
  const { color, height } = block.props;

  return {
    display: 'block',
    width: '100%',
    height: height || '1px',
    margin: '16px 0',
    backgroundColor: color || '#e5e7eb',
    border: 'none',
  };
}; 