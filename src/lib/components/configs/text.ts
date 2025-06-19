import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { Block } from '@/types/blocks';

interface TextBlockProps {
  content: string;
  color: string;
  fontSize: string;
  textAlign: string;
  lineHeight: string;
}

const { component, html } = new ComponentBuilder<TextBlockProps>('text')
  .setName('Text')
  .setDescription('Add text content to your email')
  .setCategory(ComponentCategory.Content)
  .setIcon('text')
  .addProperty({
    key: 'content',
    type: 'text',
    label: 'Content',
    category: PropertyCategory.Content,
    defaultValue: 'Enter your text here',
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
    key: 'lineHeight',
    type: 'select',
    label: 'Line Height',
    category: PropertyCategory.Style,
    defaultValue: '1.5',
    options: [
      { label: 'Tight (1.2)', value: '1.2' },
      { label: 'Normal (1.5)', value: '1.5' },
      { label: 'Relaxed (1.8)', value: '1.8' },
    ],
  })
  .setHtmlTag('p')
  .setInnerContentGenerator((block: Block<Record<string, unknown>>) => (block as unknown as Block<TextBlockProps>).props.content || '')
  .build();

export const textConfig = component;
export const textHtmlConfig = html; 