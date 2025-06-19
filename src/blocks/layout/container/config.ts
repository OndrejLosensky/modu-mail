import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const containerConfig: BaseComponentConfig = {
  id: 'container',
  type: 'container',
  category: ComponentCategory.Layout,
  label: 'Container',
  description: 'A container block to wrap other content',
  defaultProps: {
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#ffffff',
    align: 'center',
  },
  validation: {
    required: ['maxWidth'],
    rules: {
      maxWidth: (value) => {
        if (typeof value !== 'string') return 'Max width must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Max width must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      }
    }
  },
  presets: {
    'full-width': {
      maxWidth: '100%',
      padding: '0',
      backgroundColor: 'transparent',
    },
    'narrow': {
      maxWidth: '400px',
      padding: '16px',
    }
  }
}; 