import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, ListBlockProps, SocialBlockProps } from '@/types/blocks';
import { BlockHTMLConfig } from '@/lib/export/html/types';
import { textBlockStyles, buttonBlockStyles, imageBlockStyles, dividerBlockStyles, listBlockStyles, spacerBlockStyles, socialBlockStyles, socialIconStyles } from './styles';

type BlockConfigMap = Record<string, BlockHTMLConfig>;

type BlockGenerator<T, R> = (block: Block<T>) => R;

const asBlockGenerator = <T, R>(fn: BlockGenerator<T, R>): BlockGenerator<Record<string, unknown>, R> => fn as unknown as BlockGenerator<Record<string, unknown>, R>;

export const blockConfigs: BlockConfigMap = {
  text: {
    tag: 'p',
    styleGenerator: asBlockGenerator(textBlockStyles),
    innerContentGenerator: (block: Block<Record<string, unknown>>) => {
      const props = block.props as TextBlockProps;
      return props.content || 'New text block';
    },
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
  list: {
    tag: 'table',
    styleGenerator: asBlockGenerator(listBlockStyles),
    attributeGenerator: asBlockGenerator((block: Block<ListBlockProps>) => ({
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      align: block.props.textAlign || 'left',
    })),
    innerContentGenerator: asBlockGenerator((block: Block<ListBlockProps>) => {
      const items = block.props.items || [];
      const filteredItems = items.filter((item: string) => item.trim());
      const isOrdered = block.props.listType === 'ordered';
      
      const itemStyle = `
        color: ${block.props.color};
        font-size: ${block.props.fontSize};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
        padding-bottom: ${block.props.spacing};
      `;

      const markerStyle = `
        color: ${block.props.bulletColor};
        display: inline-block;
        width: 20px;
        text-align: ${isOrdered ? 'right' : 'center'};
        padding-right: 8px;
      `;

      const listItems = filteredItems.map((item: string, index: number) => `
        <tr>
          <td style="${markerStyle}">${isOrdered ? `${index + 1}.` : '•'}</td>
          <td style="${itemStyle}">${item.trim()}</td>
        </tr>
      `).join('');

      return `
        <tr>
          <td>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              ${listItems}
            </table>
          </td>
        </tr>
      `;
    }),
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
  }
}; 