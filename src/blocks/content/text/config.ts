import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const textConfig: BaseComponentConfig = {
  id: 'text',
  type: 'text',
  category: ComponentCategory.Content,
  label: 'Text',
  description: 'A block for displaying and editing text content',
  defaultProps: {
    text: 'New text block',
    fontSize: '16px',
    color: '#1f2937',
    textAlign: 'left',
  },
  validation: {
    required: ['text'],
    rules: {
      fontSize: (value) => {
        if (typeof value !== 'string') return 'Font size must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Font size must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      },
      textAlign: (value) => {
        if (!['left', 'center', 'right', 'justify'].includes(value as string)) {
          return 'Text align must be one of: left, center, right, justify';
        }
        return true;
      }
    }
  },
  presets: {
    'heading': {
      fontSize: '24px',
      color: '#111827',
      textAlign: 'left',
    },
    'subheading': {
      fontSize: '20px',
      color: '#374151',
      textAlign: 'left',
    },
    'body': {
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left',
    },
    'centered': {
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'center',
    }
  }
}; 