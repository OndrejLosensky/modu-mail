import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { Block } from '@/types/blocks';
import { PropertyCategory } from '@/types/editor';

interface SocialBlockProps {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  iconSize: string;
  iconSpacing: string;
  iconColor: string;
  alignment: string;
}

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
    type: 'select',
    label: 'Icon Size',
    category: PropertyCategory.Style,
    defaultValue: '24px',
    options: [
      { label: 'Small (20px)', value: '20px' },
      { label: 'Medium (24px)', value: '24px' },
      { label: 'Large (32px)', value: '32px' },
    ],
  })
  .addProperty({
    key: 'iconSpacing',
    type: 'select',
    label: 'Icon Spacing',
    category: PropertyCategory.Layout,
    defaultValue: '16px',
    options: [
      { label: 'Small (12px)', value: '12px' },
      { label: 'Medium (16px)', value: '16px' },
      { label: 'Large (24px)', value: '24px' },
    ],
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
  .setAttributeGenerator((block: Block<SocialBlockProps>) => ({
    role: 'presentation',
    cellpadding: '0',
    cellspacing: '0',
    border: '0',
    align: block.props.alignment,
    style: {
      margin: block.props.alignment === 'center' ? '0 auto' : '0',
    },
  }))
  .setInnerContentGenerator((block: Block<SocialBlockProps>) => {
    const networks = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
    const activeNetworks = networks.filter(network => block.props[network as keyof SocialBlockProps]);
    
    if (activeNetworks.length === 0) return '';

    return `
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${activeNetworks.map(network => `
                <td style="padding-right: ${block.props.iconSpacing}">
                  <a href="${block.props[network as keyof SocialBlockProps]}" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="/icons/${network}.svg" 
                      alt="${network}" 
                      width="${block.props.iconSize}" 
                      height="${block.props.iconSize}"
                      style="display: block; max-width: 100%; height: auto; filter: ${block.props.iconColor !== '#000000' ? `brightness(0) saturate(100%) ${getColorFilter(block.props.iconColor)}` : 'none'};"
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

  return `invert(${Math.round(r * 100)}%) sepia(${Math.round(g * 100)}%) saturate(${Math.round(b * 100)}%)`;
}

export const socialConfig = component;
export const socialHtmlConfig = html; 