import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { Block } from '@/types/blocks';

interface ListBlockProps {
  items: string;
  listType: 'ordered' | 'unordered';
  color: string;
  fontSize: string;
  textAlign: string;
  spacing: string;
  bulletColor: string;
}

const { component, html } = new ComponentBuilder<ListBlockProps>('list')
  .setName('List')
  .setDescription('Add a bulleted or numbered list')
  .setCategory(ComponentCategory.Content)
  .setIcon('list')
  .addProperty({
    key: 'items',
    type: 'text',
    label: 'List Items',
    category: PropertyCategory.Content,
    defaultValue: 'Item 1\nItem 2\nItem 3',
  })
  .addProperty({
    key: 'listType',
    type: 'select',
    label: 'List Type',
    category: PropertyCategory.Content,
    defaultValue: 'unordered',
    options: [
      { label: 'Bulleted List', value: 'unordered' },
      { label: 'Numbered List', value: 'ordered' },
    ],
  })
  .addProperty({
    key: 'color',
    type: 'color',
    label: 'Text Color',
    category: PropertyCategory.Style,
    defaultValue: '#000000',
  })
  .addProperty({
    key: 'fontSize',
    type: 'select',
    label: 'Font Size',
    category: PropertyCategory.Style,
    defaultValue: '16px',
    options: [
      { label: 'Small (14px)', value: '14px' },
      { label: 'Medium (16px)', value: '16px' },
      { label: 'Large (18px)', value: '18px' },
      { label: 'Extra Large (24px)', value: '24px' },
    ],
  })
  .addProperty({
    key: 'textAlign',
    type: 'select',
    label: 'Text Alignment',
    category: PropertyCategory.Style,
    defaultValue: 'left',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  })
  .addProperty({
    key: 'spacing',
    type: 'select',
    label: 'Item Spacing',
    category: PropertyCategory.Layout,
    defaultValue: '8px',
    options: [
      { label: 'Tight (4px)', value: '4px' },
      { label: 'Normal (8px)', value: '8px' },
      { label: 'Relaxed (12px)', value: '12px' },
      { label: 'Loose (16px)', value: '16px' },
    ],
  })
  .addProperty({
    key: 'bulletColor',
    type: 'color',
    label: 'Bullet/Number Color',
    category: PropertyCategory.Style,
    defaultValue: '#000000',
  })
  .setHtmlTag('table')
  .setAttributeGenerator((block: Block<ListBlockProps>) => ({
    role: 'presentation',
    cellpadding: '0',
    cellspacing: '0',
    border: '0',
    width: '100%',
    align: block.props.textAlign,
  }))
  .setInnerContentGenerator((block: Block<ListBlockProps>) => {
    const items = (block.props.items || '').split('\n').filter(item => item.trim());
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

    const listItems = items.map((item, index) => `
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
  })
  .build();

export const listConfig = component;
export const listHtmlConfig = html; 