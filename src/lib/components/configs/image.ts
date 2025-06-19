import { ComponentConfig } from '@/types/editor';
import { styleGenerator } from '@/lib/email/styles';

export const imageComponentConfig: ComponentConfig = {
  id: 'image',
  type: 'image',
  name: 'Image',
  description: 'Add and customize images',
  category: 'media',
  icon: 'image',
  properties: [
    {
      key: 'src',
      type: 'url',
      label: 'Image URL',
      defaultValue: '',
      category: 'basic',
      validation: {
        required: true,
        pattern: '^https?://.+'
      }
    },
    {
      key: 'alt',
      type: 'text',
      label: 'Alt Text',
      defaultValue: '',
      category: 'basic',
      description: 'Alternative text for accessibility'
    },
    {
      key: 'width',
      type: 'select',
      label: 'Width',
      defaultValue: '100%',
      category: 'layout',
      options: [
        { label: 'Full Width', value: '100%' },
        { label: 'Half Width', value: '50%' },
        { label: 'Quarter Width', value: '25%' }
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
      key: 'borderRadius',
      type: 'size',
      label: 'Corner Radius',
      defaultValue: '0px',
      category: 'style'
    },
    {
      key: 'link',
      type: 'url',
      label: 'Link URL',
      defaultValue: '',
      category: 'advanced',
      description: 'Make the image clickable (optional)'
    }
  ],
  styles: {
    ...styleGenerator.applyPresetWithResponsive('image'),
    responsive: {
      '480px': [
        { property: 'width', value: '100%' },
        { property: 'margin', value: '0 auto' }
      ]
    }
  }
}; 