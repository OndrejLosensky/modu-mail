import { Block, TextBlockProps, ButtonBlockProps, DividerBlockProps, ListBlockProps, SpacerBlockProps, SocialBlockProps, ColumnsBlockProps } from '@/types/blocks';

export const textBlockStyles = (block: Block<TextBlockProps>) => {
  const props = block.props;
  return {
    fontSize: props.fontSize || '16px',
    color: props.color || '#1f2937',
    textAlign: props.textAlign || 'left',
    margin: '0',
    padding: '0',
    lineHeight: '1.5',
  };
};

export const buttonBlockStyles = (block: Block<ButtonBlockProps>) => {
  const props = block.props;
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

export const dividerBlockStyles = (block: Block<DividerBlockProps>) => {
  const props = block.props;
  return {
    border: 'none',
    borderTop: `${props.height || '1px'} solid ${props.color || '#e5e7eb'}`,
    margin: '0',
    padding: '0',
  };
};

export const listBlockStyles = (block: Block<ListBlockProps>) => {
  const props = block.props;
  return {
    fontSize: props.fontSize || '16px',
    color: props.color || '#1f2937',
    textAlign: props.textAlign || 'left',
    margin: '0',
    padding: '0',
    lineHeight: `calc(1.5 + ${props.spacing || '0.5em'})`,
  };
};

export const spacerBlockStyles = (block: Block<SpacerBlockProps>): Record<string, string> => {
  const props = block.props;
  return {
    display: 'block',
    height: props.height || '20px',
    width: '100%',
    margin: '0',
    padding: '0',
    fontSize: '1px',
    lineHeight: '1px'
  };
};

export const socialBlockStyles = (block: Block<SocialBlockProps>): Record<string, string> => {
  const props = block.props;
  return {
    display: 'table',
    width: '100%',
    textAlign: props.alignment || 'center',
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

export const columnsBlockStyles = (block: Block<ColumnsBlockProps>): Record<string, string> => {
  const props = block.props;
  return {
    display: 'table',
    width: '100%',
    backgroundColor: props.backgroundColor || '#ffffff',
    padding: props.padding || '0'
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