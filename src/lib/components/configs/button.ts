import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { TextAlignment } from '@/types/blocks';

interface ButtonBlockProps {
  text: string;
  url: string;
  color: string;
  backgroundColor: string;
  borderRadius: string;
  paddingX: string;
  paddingY: string;
  alignment: TextAlignment;
}

const { component, html } = new ComponentBuilder<ButtonBlockProps>('button')
  .setName('Button')
  .setDescription('Add a clickable button')
  .setCategory(ComponentCategory.Interactive)
  .setIcon('button')
  .addProperty({
    key: 'text',
    type: 'text',
    label: 'Button Text',
    category: PropertyCategory.Content,
    defaultValue: 'Click me',
  })
  .addProperty({
    key: 'url',
    type: 'url',
    label: 'URL',
    category: PropertyCategory.Content,
    defaultValue: 'https://',
  })
  .addProperty({
    key: 'color',
    type: 'color',
    label: 'Text Color',
    category: PropertyCategory.Style,
    defaultValue: '#ffffff',
  })
  .addProperty({
    key: 'backgroundColor',
    type: 'color',
    label: 'Background Color',
    category: PropertyCategory.Style,
    defaultValue: '#007bff',
  })
  .addProperty({
    key: 'borderRadius',
    type: 'size',
    label: 'Border Radius',
    category: PropertyCategory.Style,
    defaultValue: '4px',
  })
  .addProperty({
    key: 'paddingX',
    type: 'size',
    label: 'Horizontal Padding',
    category: PropertyCategory.Style,
    defaultValue: '24px',
  })
  .addProperty({
    key: 'paddingY',
    type: 'size',
    label: 'Vertical Padding',
    category: PropertyCategory.Style,
    defaultValue: '12px',
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
    const props = block.props as unknown as ButtonBlockProps;
    return {
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      align: props.alignment,
    };
  })
  .setInnerContentGenerator((block) => {
    const props = block.props as unknown as ButtonBlockProps;
    return `
      <tr>
        <td align="${props.alignment}">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td bgcolor="${props.backgroundColor}" style="border-radius: ${props.borderRadius};">
                <a 
                  href="${props.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    border: none;
                    color: ${props.color};
                    display: inline-block;
                    font-family: sans-serif;
                    text-decoration: none;
                    padding: ${props.paddingY} ${props.paddingX};
                    border-radius: ${props.borderRadius};
                  "
                >
                  ${props.text || ''}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  })
  .build();

export const buttonConfig = component;
export const buttonHtmlConfig = html; 