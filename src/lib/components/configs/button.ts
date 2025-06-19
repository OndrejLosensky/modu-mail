import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { Block } from '@/types/blocks';
import { PropertyCategory } from '@/types/editor';

interface ButtonBlockProps {
  text: string;
  url: string;
  color: string;
  backgroundColor: string;
  borderRadius: string;
  padding: string;
  textAlign: string;
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
    type: 'select',
    label: 'Border Radius',
    category: PropertyCategory.Style,
    defaultValue: '4px',
    options: [
      { label: 'None', value: '0px' },
      { label: 'Small', value: '4px' },
      { label: 'Medium', value: '8px' },
      { label: 'Large', value: '16px' },
      { label: 'Pill', value: '9999px' },
    ],
  })
  .addProperty({
    key: 'padding',
    type: 'select',
    label: 'Padding',
    category: PropertyCategory.Style,
    defaultValue: '12px 24px',
    options: [
      { label: 'Small', value: '8px 16px' },
      { label: 'Medium', value: '12px 24px' },
      { label: 'Large', value: '16px 32px' },
    ],
  })
  .addProperty({
    key: 'textAlign',
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
  .setHtmlTag('a')
  .setAttributeGenerator((block: Block<ButtonBlockProps>) => ({
    href: block.props.url,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: {
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: block.props.textAlign,
      color: block.props.color,
      backgroundColor: block.props.backgroundColor,
      borderRadius: block.props.borderRadius,
      padding: block.props.padding,
    },
  }))
  .setInnerContentGenerator((block: Block<ButtonBlockProps>) => block.props.text || '')
  .build();

export const buttonConfig = component;
export const buttonHtmlConfig = html; 