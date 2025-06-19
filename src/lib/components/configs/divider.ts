import { ComponentConfig } from '@/types/editor';
import { styleGenerator } from '@/lib/email/styles';

export const dividerComponentConfig: ComponentConfig = {
  id: 'divider',
  type: 'divider',
  name: 'Divider',
  description: 'Add a horizontal line to separate content',
  category: 'layout',
  icon: 'minus',
  properties: [
    {
      key: 'style',
      type: 'select',
      label: 'Style',
      defaultValue: 'solid',
      category: 'style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' }
      ]
    },
    {
      key: 'color',
      type: 'color',
      label: 'Color',
      defaultValue: '#E5E7EB',
      category: 'style'
    },
    {
      key: 'width',
      type: 'select',
      label: 'Width',
      defaultValue: '100%',
      category: 'layout',
      options: [
        { label: 'Full Width', value: '100%' },
        { label: 'Three Quarters', value: '75%' },
        { label: 'Half Width', value: '50%' }
      ]
    },
    {
      key: 'thickness',
      type: 'select',
      label: 'Thickness',
      defaultValue: '1px',
      category: 'style',
      options: [
        { label: 'Thin', value: '1px' },
        { label: 'Medium', value: '2px' },
        { label: 'Thick', value: '4px' }
      ]
    },
    {
      key: 'spacing',
      type: 'select',
      label: 'Spacing',
      defaultValue: 'medium',
      category: 'layout',
      options: [
        { label: 'Small', value: '10px' },
        { label: 'Medium', value: '20px' },
        { label: 'Large', value: '40px' }
      ]
    }
  ],
  styles: styleGenerator.applyPresetWithResponsive('divider')
}; 