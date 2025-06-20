import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { TextAlignment } from '@/types/blocks';

interface DividerBlockProps {
  color: string;
  width: string;
  height: string;
  alignment: TextAlignment;
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
    type: 'size',
    label: 'Height',
    category: PropertyCategory.Style,
    defaultValue: '1px',
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
    align: block.props.alignment,
  }))
  .setInnerContentGenerator((block) => {
    const props = block.props as unknown as DividerBlockProps;
    return `
      <tr>
        <td align="${props.alignment}">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${props.width}" align="${props.alignment}">
            <tr>
              <td bgcolor="${props.color}" style="font-size: 0; line-height: 0; height: ${props.height};">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  })
  .build();

export const dividerConfig = component;
export const dividerHtmlConfig = html; 