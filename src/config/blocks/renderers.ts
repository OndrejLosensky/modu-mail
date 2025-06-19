import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, SocialBlockProps, ColumnsBlockProps } from '@/types/blocks';
import { BlockHTMLConfig } from '@/lib/export/html/types';
import { textBlockStyles, buttonBlockStyles, imageBlockStyles, dividerBlockStyles, spacerBlockStyles, socialBlockStyles, socialIconStyles, columnsBlockStyles, columnStyles } from './styles';

type BlockConfigMap = Record<string, BlockHTMLConfig>;

type BlockGenerator<T, R> = (block: Block<T>) => R;

const asBlockGenerator = <T, R>(fn: BlockGenerator<T, R>): BlockGenerator<Record<string, unknown>, R> => fn as unknown as BlockGenerator<Record<string, unknown>, R>;

export const blockConfigs: BlockConfigMap = {
  text: {
    tag: 'p',
    styleGenerator: asBlockGenerator(textBlockStyles),
    innerContentGenerator: asBlockGenerator((block: Block<TextBlockProps>) => block.props.text || ''),
  },
  button: {
    tag: 'a',
    styleGenerator: asBlockGenerator(buttonBlockStyles),
    attributeGenerator: asBlockGenerator((block: Block<ButtonBlockProps>) => ({
      href: block.props.href || '#',
      target: '_blank',
      rel: 'noopener noreferrer',
    })),
    innerContentGenerator: asBlockGenerator((block: Block<ButtonBlockProps>) => block.props.text || 'Click here'),
  },
  image: {
    tag: 'img',
    styleGenerator: asBlockGenerator(imageBlockStyles),
    attributeGenerator: asBlockGenerator((block: Block<ImageBlockProps>) => ({
      src: block.props.src || '',
      alt: block.props.alt || '',
    })),
  },
  divider: {
    tag: 'hr',
    styleGenerator: asBlockGenerator(dividerBlockStyles),
  },
  spacer: {
    tag: 'div',
    styleGenerator: asBlockGenerator(spacerBlockStyles),
    innerContentGenerator: () => '&nbsp;',
  },
  social: {
    tag: 'div',
    styleGenerator: asBlockGenerator(socialBlockStyles),
    innerContentGenerator: asBlockGenerator((block: Block<SocialBlockProps>) => {
      const networks = block.props.networks || [];
      return networks.map(network => {
        const iconStyle = socialIconStyles(block.props.iconSize || '24px', block.props.spacing || '16px');
        const iconStyleString = Object.entries(iconStyle)
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ');
        return `
          <a href="${network.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
            <img 
              src="/icons/${network.platform}.svg" 
              alt="${network.platform}" 
              style="${iconStyleString}"
            />
          </a>
        `;
      }).join('');
    }),
  },
  columns: {
    tag: 'div',
    styleGenerator: asBlockGenerator(columnsBlockStyles),
    innerContentGenerator: asBlockGenerator((block: Block<ColumnsBlockProps>) => {
      const leftColumnStyle = columnStyles(
        block.props.columnRatio || '1:1',
        block.props.spacing || '10px',
        block.props.verticalAlignment || 'top'
      );
      const rightColumnStyle = {
        ...leftColumnStyle,
        width: `${(1 - parseFloat(leftColumnStyle.width)) * 100}%`
      };
      const leftStyleString = Object.entries(leftColumnStyle)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
      const rightStyleString = Object.entries(rightColumnStyle)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
      return `
        <div style="${leftStyleString}">
          <!-- Left column content -->
        </div>
        <div style="${rightStyleString}">
          <!-- Right column content -->
        </div>
      `;
    }),
  },
}; 