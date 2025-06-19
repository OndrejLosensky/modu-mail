import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';

interface DividerBlockProps {
  color: string;
  style: string;
  width: string;
  height: string;
  alignment: string;
}

const { component, html } = new ComponentBuilder<DividerBlockProps>('divider')
  .setName('Divider')
  .setDescription('Add a horizontal line to separate content')
  .setCategory(ComponentCategory.Content)
  .setIcon('divider')
  .addProperty({
    key: 'color',
    type: 'color',
    label: 'Color',
    category: PropertyCategory.Style,
    defaultValue: '#e5e7eb',
  })
  .addProperty({
    key: 'style',
    type: 'select',
    label: 'Style',
    category: PropertyCategory.Style,
    defaultValue: 'solid',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Dashed', value: 'dashed' },
      { label: 'Dotted', value: 'dotted' },
    ],
  })
  .addProperty({
    key: 'width',
    type: 'select',
    label: 'Width',
    category: PropertyCategory.Layout,
    defaultValue: '100%',
    options: [
      { label: 'Full Width', value: '100%' },
      { label: '75%', value: '75%' },
      { label: '50%', value: '50%' },
      { label: '25%', value: '25%' },
    ],
  })
  .addProperty({
    key: 'height',
    type: 'select',
    label: 'Height',
    category: PropertyCategory.Style,
    defaultValue: '1px',
    options: [
      { label: 'Thin (1px)', value: '1px' },
      { label: 'Medium (2px)', value: '2px' },
      { label: 'Thick (4px)', value: '4px' },
    ],
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
  .setAttributeGenerator((block) => ({
    role: 'presentation',
    cellpadding: '0',
    cellspacing: '0',
    border: '0',
    width: '100%',
    align: block.props.alignment as string,
  }))
  .setInnerContentGenerator((block) => `
    <tr>
      <td align="${block.props.alignment}">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${block.props.width}" align="${block.props.alignment}">
          <tr>
            <td style="border-top: ${block.props.height} ${block.props.style} ${block.props.color}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  `)
  .build();

export const dividerConfig = component;
export const dividerHtmlConfig = html; 