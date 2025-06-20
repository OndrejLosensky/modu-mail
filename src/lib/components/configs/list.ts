import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { PropertyValue } from '@/types/editor';

interface ListBlockProps {
  items: string[];
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
    defaultValue: 'First item\nSecond item\nThird item',
    transform: (value: PropertyValue) => {
      if (typeof value === 'string') {
        // Split by newlines and filter out empty items
        return value.split(/\n|,/).map(item => item.trim()).filter(Boolean) as unknown as PropertyValue;
      }
      // If it's already an array, return it, otherwise return default array
      return (Array.isArray(value) ? value : ['First item', 'Second item', 'Third item']) as unknown as PropertyValue;
    },
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
    type: 'size',
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
    type: 'sizePresets',
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
  .setAttributeGenerator((block) => {
    const props = block.props as unknown as ListBlockProps;
    return {
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      align: props.textAlign || 'left',
    };
  })
  .setInnerContentGenerator((block) => {
    const props = block.props as unknown as ListBlockProps;
    const items = Array.isArray(props.items) ? props.items : [];
    const isOrdered = props.listType === 'ordered';
    
    const itemStyle = `
      color: ${props.color || '#000000'};
      font-size: ${props.fontSize || '16px'};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      padding-bottom: ${props.spacing || '8px'};
      text-decoration: none;
    `;

    const markerStyle = `
      color: ${props.bulletColor || '#000000'};
      width: 12px;
      padding-right: 4px;
      vertical-align: top;
      text-align: ${isOrdered ? 'right' : 'center'};
    `;

    const listItems = items.map((item, index) => `
      <tr>
        <td width="12" style="${markerStyle}">${isOrdered ? `${index + 1}.` : '•'}</td>
        <td style="${itemStyle}">${item.trim()}</td>
      </tr>
    `).join('');

    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${listItems}</table>`;
  })
  .build();

export const listConfig = component;
export const listHtmlConfig = html;