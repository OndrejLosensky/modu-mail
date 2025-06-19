import { ComponentConfig } from '@/types/editor';
import { styleGenerator } from '@/lib/email/styles';

export const textComponentConfig: ComponentConfig = {
  id: 'text',
  type: 'text',
  name: 'Text',
  description: 'Add and style text content',
  category: 'content',
  icon: 'type',
  properties: [
    {
      key: 'text',
      type: 'text',
      label: 'Content',
      description: 'The text content to display',
      defaultValue: 'Enter your text here',
      category: 'basic'
    },
    {
      key: 'fontSize',
      type: 'size',
      label: 'Font Size',
      defaultValue: '16px',
      category: 'style'
    },
    {
      key: 'fontWeight',
      type: 'select',
      label: 'Font Weight',
      defaultValue: 'normal',
      category: 'style',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Medium', value: '500' },
        { label: 'Bold', value: 'bold' }
      ]
    },
    {
      key: 'color',
      type: 'color',
      label: 'Text Color',
      defaultValue: '#333333',
      category: 'style'
    },
    {
      key: 'textAlign',
      type: 'alignment',
      label: 'Alignment',
      defaultValue: 'left',
      category: 'style'
    },
    {
      key: 'lineHeight',
      type: 'select',
      label: 'Line Height',
      defaultValue: '1.5',
      category: 'style',
      options: [
        { label: 'Tight', value: '1.2' },
        { label: 'Normal', value: '1.5' },
        { label: 'Relaxed', value: '1.8' }
      ]
    },
    {
      key: 'letterSpacing',
      type: 'select',
      label: 'Letter Spacing',
      defaultValue: 'normal',
      category: 'advanced',
      options: [
        { label: 'Tight', value: '-0.05em' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: '0.05em' }
      ]
    }
  ],
  styles: styleGenerator.applyPresetWithResponsive('text')
}; 