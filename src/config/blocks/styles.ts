import { Block, TextBlockProps, ButtonBlockProps, DividerBlockProps, ListBlockProps } from '@/types/blocks';

export const textBlockStyles = (block: Block) => {
  const props = block.props as TextBlockProps;
  return {
    fontSize: props.fontSize || '16px',
    color: props.color || '#1f2937',
    textAlign: props.textAlign || 'left',
    margin: '0',
    padding: '0',
    lineHeight: '1.5',
  };
};

export const buttonBlockStyles = (block: Block) => {
  const props = block.props as ButtonBlockProps;
  return {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: props.fontSize || '16px',
    color: props.color || '#ffffff',
    backgroundColor: props.backgroundColor || '#3b82f6',
    borderRadius: '6px',
    textDecoration: 'none',
    margin: '0',
  };
};

export const imageBlockStyles = () => ({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  margin: '0',
});

export const dividerBlockStyles = (block: Block) => {
  const props = block.props as DividerBlockProps;
  return {
    border: 'none',
    borderTop: `${props.height || '1px'} solid ${props.color || '#e5e7eb'}`,
    margin: '0',
    padding: '0',
  };
};

export const listBlockStyles = (block: Block) => {
  const props = block.props as ListBlockProps;
  return {
    fontSize: props.fontSize || '16px',
    color: props.color || '#1f2937',
    textAlign: props.textAlign || 'left',
    margin: '0',
    padding: '0',
    lineHeight: `calc(1.5 + ${props.spacing || '0.5em'})`,
  };
}; 