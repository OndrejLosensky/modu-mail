import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { Block, TextAlignment } from '@/types/blocks';

interface TextBlockProps {
  content: string;
  color: string;
  fontSize: string;
  textAlign: TextAlignment;
  fontWeight: string;
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
    key: 'fontWeight',
    type: 'select',
    label: 'Text Weight',
    category: PropertyCategory.Style,
    defaultValue: '400',
    options: [
      { label: 'Light', value: '300' },
      { label: 'Normal', value: '400' },
      { label: 'Medium', value: '500' },
      { label: 'Semi Bold', value: '600' },
      { label: 'Bold', value: '700' },
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
  .setHtmlTag('p')
  .setInnerContentGenerator((block: Block<Record<string, unknown>>) => {
    const props = block.props as unknown as TextBlockProps;
    return props.content || '';
  })
  .build();

export const textConfig = component;
export const textHtmlConfig = html; 