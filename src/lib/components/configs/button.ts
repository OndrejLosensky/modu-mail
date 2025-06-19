import { ComponentConfig } from '@/types/editor';
import { styleGenerator } from '@/lib/email/styles';

export const buttonComponentConfig: ComponentConfig = {
  id: 'button',
  type: 'button',
  name: 'Button',
  description: 'Add a clickable button',
  category: 'interactive',
  icon: 'button',
  properties: [
    {
      key: 'text',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Click me',
      category: 'basic'
    },
    {
      key: 'url',
      type: 'url',
      label: 'Link URL',
      defaultValue: 'https://',
      category: 'basic',
      validation: {
        required: true,
        pattern: '^https?://.+'
      }
    },
    {
      key: 'backgroundColor',
      type: 'color',
      label: 'Background Color',
      defaultValue: '#0066CC',
      category: 'style'
    },
    {
      key: 'textColor',
      type: 'color',
      label: 'Text Color',
      defaultValue: '#FFFFFF',
      category: 'style'
    },
    {
      key: 'fontSize',
      type: 'size',
      label: 'Font Size',
      defaultValue: '16px',
      category: 'style'
    },
    {
      key: 'borderRadius',
      type: 'size',
      label: 'Corner Radius',
      defaultValue: '4px',
      category: 'style'
    },
    {
      key: 'width',
      type: 'select',
      label: 'Button Width',
      defaultValue: 'auto',
      category: 'layout',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Full Width', value: '100%' }
      ]
    },
    {
      key: 'alignment',
      type: 'alignment',
      label: 'Alignment',
      defaultValue: 'center',
      category: 'layout'
    },
    {
      key: 'padding',
      type: 'select',
      label: 'Padding',
      defaultValue: 'medium',
      category: 'layout',
      options: [
        { label: 'Small', value: '8px 16px' },
        { label: 'Medium', value: '12px 24px' },
        { label: 'Large', value: '16px 32px' }
      ]
    }
  ],
  styles: {
    ...styleGenerator.applyPresetWithResponsive('button'),
    base: [
      ...styleGenerator.applyPreset('button'),
      { property: 'background-color', value: '#0066CC' },
      { property: 'color', value: '#FFFFFF' },
      { property: 'text-align', value: 'center' }
    ]
  }
}; 