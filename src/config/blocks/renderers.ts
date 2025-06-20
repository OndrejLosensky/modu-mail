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
      const props = block.props as ButtonBlockProps;
      const {
        backgroundColor = '#3B82F6',
        textColor = '#FFFFFF',
        borderRadius = '6px',
        paddingX = '24px',
        paddingY = '12px',
        align = 'left',
        width = 'auto',
        url = '#',
        text = 'Click here'
      } = props;

      const buttonStyle = `
        background-color: ${backgroundColor};
        border-radius: ${borderRadius};
        color: ${textColor};
        display: inline-block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 1;
        margin: 0;
        padding: ${paddingY} ${paddingX};
        text-align: center;
        text-decoration: none;
        width: ${width === 'full' ? '100%' : 'auto'};
        -webkit-text-size-adjust: none;
        mso-hide: all;
      `;

      const tdStyle = `text-align: ${align};`;

      return `
        <tbody>
          <tr>
            <td style="${tdStyle}">
              <a href="${url}" target="_blank" style="${buttonStyle}">
                ${text}
              </a>
            </td>
          </tr>
        </tbody>
      `;
    }),
  },
  image: {
    tag: 'table',
    styleGenerator: asBlockGenerator(imageBlockStyles),
    attributeGenerator: asBlockGenerator(() => ({
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      style: 'width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;'
    })),
    innerContentGenerator: asBlockGenerator((block: Block<ImageBlockProps>) => {
      const props = block.props;
      const {
        src = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
        alt = 'Image description',
        width = '100%',
        height = 'auto',
        align = 'center'
      } = props;

      const imgStyle = `
        display: block;
        width: ${width};
        height: ${height};
        max-width: 100%;
        margin: 0 auto;
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      `;

      return `
        <tbody>
          <tr>
            <td align="${align}" style="text-align: ${align};">
              <img 
                src="${src}" 
                alt="${alt}"
                width="${width}"
                height="${height}"
                style="${imgStyle}"
              />
            </td>
          </tr>
        </tbody>
      `;
    }),
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
    attributeGenerator: asBlockGenerator((block) => {
      const props = block.props as ListBlockProps;
      return {
        role: 'presentation',
        cellpadding: '0',
        cellspacing: '0',
        border: '0',
        width: '100%',
        align: props.textAlign || 'left',
      };
    }),
    innerContentGenerator: asBlockGenerator((block: Block<ListBlockProps>) => {
      const props = block.props;
      const rawItems = props.items || [];
      // Ensure we have a string array
      const items = Array.isArray(rawItems) 
        ? rawItems.filter(Boolean)
        : String(rawItems).split(/\n|,/).map(item => item.trim()).filter(Boolean);

      const isOrdered = props.listType === 'ordered';
      
      const itemStyle = `
        color: ${props.color || '#000000'};
        font-size: ${props.fontSize || '16px'};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
        padding-bottom: ${props.spacing || '8px'};
        text-align: ${props.textAlign || 'left'};
      `;

      const markerStyle = `
        color: ${props.bulletColor || props.color || '#000000'};
        width: 24px;
        padding-right: 8px;
        vertical-align: top;
        text-align: ${isOrdered ? 'right' : 'center'};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      `;

      const containerStyle = `
        width: 100%;
        text-align: ${props.textAlign || 'left'};
      `;

      const listItems = items.map((item: string, index: number) => `
        <tr>
          <td width="24" style="${markerStyle}">${isOrdered ? `${index + 1}.` : '•'}</td>
          <td style="${itemStyle}">${item.trim()}</td>
        </tr>
      `).join('');

      return `
        <tr>
          <td style="${containerStyle}">
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