import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { SocialBlockProps } from '@/types/blocks';

const { component, html } = new ComponentBuilder<SocialBlockProps>('social')
  .setName('Social Links')
  .setDescription('Add social media links')
  .setCategory(ComponentCategory.Social)
  .setIcon('social')
  .addProperty({
    key: 'facebook',
    type: 'url',
    label: 'Facebook URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .addProperty({
    key: 'twitter',
    type: 'url',
    label: 'Twitter URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .addProperty({
    key: 'linkedin',
    type: 'url',
    label: 'LinkedIn URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .addProperty({
    key: 'instagram',
    type: 'url',
    label: 'Instagram URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .addProperty({
    key: 'youtube',
    type: 'url',
    label: 'YouTube URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .addProperty({
    key: 'iconSize',
    type: 'size',
    label: 'Icon Size',
    category: PropertyCategory.Style,
    defaultValue: '24px',
  })
  .addProperty({
    key: 'spacing',
    type: 'size',
    label: 'Icon Spacing',
    category: PropertyCategory.Layout,
    defaultValue: '16px',
  })
  .addProperty({
    key: 'iconColor',
    type: 'color',
    label: 'Icon Color',
    category: PropertyCategory.Style,
    defaultValue: '#000000',
  })
  .addProperty({
    key: 'alignment',
    type: 'select',
    label: 'Alignment',
    category: PropertyCategory.Layout,
    defaultValue: 'center',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  })
  .setHtmlTag('table')
  .setAttributeGenerator((block) => {
    const props = block.props as Record<string, string>;
    return {
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      align: props.alignment || 'center',
    };
  })
  .setInnerContentGenerator((block) => {
    const props = block.props as Record<string, string>;
    const networks = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
    const validNetworks = networks.filter(network => props[network] && props[network].trim() !== '');
    
    if (validNetworks.length === 0) return '';

    // Get the base URL for icons - in preview we need to use absolute path
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    return `
      <tr>
        <td align="${props.alignment || 'center'}">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${validNetworks.map((network, index) => `
                <td ${index < validNetworks.length - 1 ? `style="padding-right: ${props.spacing || '16px'};"` : ''}>
                  <a href="${props[network]}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <img 
                      src="${baseUrl}/icons/${network}.svg" 
                      alt="" 
                      width="${props.iconSize || '24px'}" 
                      height="${props.iconSize || '24px'}"
                      style="display: block; border: 0; ${props.iconColor !== '#000000' ? `filter: ${getColorFilter(props.iconColor)};` : ''}"
                      aria-hidden="true"
                    />
                  </a>
                </td>
              `).join('')}
            </tr>
          </table>
        </td>
      </tr>
    `;
  })
  .build();

function getColorFilter(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  return `brightness(0) saturate(100%) invert(${Math.round(r * 100)}%) sepia(${Math.round(g * 100)}%) saturate(${Math.round(b * 100)}%)`;
}

export const socialConfig = component;
export const socialHtmlConfig = html; 