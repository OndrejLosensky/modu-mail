import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const dividerConfig: BaseComponentConfig = {
  id: 'divider',
  type: 'divider',
  category: ComponentCategory.CONTENT,
  label: 'Divider',
  description: 'A horizontal line to separate content',
  defaultProps: {
    color: '#e5e7eb',
    height: '1px',
    margin: '20px 0',
    width: '100%',
    borderStyle: 'solid'
  },
  validation: {
    rules: {
      height: (value) => {
        if (typeof value !== 'string') return 'Height must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Height must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      },
      borderStyle: (value) => {
        if (!['solid', 'dashed', 'dotted'].includes(value as string)) {
          return 'Style must be one of: solid, dashed, dotted';
        }
        return true;
      }
    }
  },
  presets: {
    'thin': {
      height: '1px',
      color: '#e5e7eb',
      borderStyle: 'solid'
    },
    'thick': {
      height: '3px',
      color: '#d1d5db',
      borderStyle: 'solid'
    },
    'dashed': {
      height: '2px',
      color: '#e5e7eb',
      borderStyle: 'dashed'
    },
    'dotted': {
      height: '2px',
      color: '#e5e7eb',
      borderStyle: 'dotted'
    }
  }
}; 