import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, ListBlockProps, SocialBlockProps } from '@/types/blocks';
import { BlockHTMLConfig } from '@/lib/export/html/types';
import { textBlockStyles, buttonBlockStyles, imageBlockStyles, dividerBlockStyles, listBlockStyles, spacerBlockStyles, socialBlockStyles } from './styles';

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
    tag: 'table',
    styleGenerator: asBlockGenerator(buttonBlockStyles),
    attributeGenerator: asBlockGenerator(() => ({
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      style: 'width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;'
    })),
    innerContentGenerator: asBlockGenerator((block: Block<ButtonBlockProps>) => {
      const buttonStyle = `
        display: inline-block;
        padding: 12px 24px;
        background-color: ${block.props.backgroundColor || '#3B82F6'};
        color: ${block.props.textColor || '#FFFFFF'};
        text-decoration: none;
        border-radius: ${block.props.borderRadius || '6px'};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 1;
        text-align: center;
        mso-padding-alt: 0;
        ${block.props.width === 'full' ? 'width: 100%;' : ''}
      `;

      const tdStyle = `
        padding: 0;
        text-align: ${block.props.align || 'left'};
        font-size: 0;
        mso-line-height-rule: exactly;
      `;

      return `
        <tr>
          <td style="${tdStyle}">
            <table role="presentation" cellpadding="0" cellspacing="0" style="display: ${block.props.align === 'right' ? 'inline-table' : 'table'}; margin-left: ${block.props.align === 'center' ? 'auto' : '0'}; margin-right: ${block.props.align === 'left' ? '0' : 'auto'};">
              <tr>
                <td style="padding: 0;">
                  <a href="${block.props.url || '#'}" target="_blank" rel="noopener noreferrer" style="${buttonStyle}">
                    ${block.props.text || 'Click here'}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    }),
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
    attributeGenerator: asBlockGenerator(() => ({
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      align: 'left',
    })),
    innerContentGenerator: asBlockGenerator((block: Block<ListBlockProps>) => {
      const rawItems = block.props.items || [];
      // Ensure we have a string array
      const items = Array.isArray(rawItems) 
        ? rawItems.filter(Boolean)
        : String(rawItems).split(/\n|,/).map(item => item.trim()).filter(Boolean);

      const isOrdered = block.props.type === 'ordered';
      
      const itemStyle = `
        color: ${block.props.color || '#000000'};
        font-size: ${block.props.fontSize || '16px'};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
        padding-bottom: 8px;
      `;

      const markerStyle = `
        color: ${block.props.color || '#000000'};
        display: inline-block;
        width: 20px;
        text-align: ${isOrdered ? 'right' : 'center'};
        padding-right: 8px;
      `;

      const listItems = items.map((item: string, index: number) => `
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
      const props = block.props as unknown as Record<string, string>;
      const networks = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
      const validNetworks = networks.filter(network => props[network] && props[network].trim() !== '');
      
      if (validNetworks.length === 0) return '';

      const iconSize = props.iconSize || '24px';
      const spacing = props.spacing || '16px';
      const iconColor = props.iconColor || '#000000';

      return validNetworks.map((network, index) => {
        const isLast = index === validNetworks.length - 1;
        return `
          <a href="${props[network]}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;${!isLast ? ` margin-right: ${spacing};` : ''}">
            <img 
              src="/icons/${network}.svg" 
              alt="" 
              width="${iconSize}"
              height="${iconSize}"
              style="display: block; border: 0; ${iconColor !== '#000000' ? `filter: ${getColorFilter(iconColor)};` : ''}"
              aria-hidden="true"
            />
          </a>
        `;
      }).join('');
    }),
  }
};

function getColorFilter(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  return `brightness(0) saturate(100%) invert(${Math.round(r * 100)}%) sepia(${Math.round(g * 100)}%) saturate(${Math.round(b * 100)}%)`;
} 