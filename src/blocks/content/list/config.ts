import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const listConfig: BaseComponentConfig = {
  id: 'list',
  type: 'list',
  category: ComponentCategory.CONTENT,
  label: 'List',
  description: 'Add a bulleted or numbered list',
  defaultProps: {
    items: ['First item', 'Second item', 'Third item'],
    listType: 'unordered',
    fontSize: '16px',
    color: '#1f2937',
    textAlign: 'left',
    bulletColor: '#1f2937',
    spacing: '0.5em'
  },
  validation: {
    required: ['items', 'listType'],
    rules: {
      listType: (value) => {
        if (!['ordered', 'unordered'].includes(value as string)) {
          return 'List type must be either ordered or unordered';
        }
        return true;
      },
      fontSize: (value) => {
        if (typeof value !== 'string') return 'Font size must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Font size must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      },
      textAlign: (value) => {
        if (!['left', 'center', 'right'].includes(value as string)) {
          return 'Text align must be one of: left, center, right';
        }
        return true;
      }
    }
  },
  presets: {
    'default': {
      listType: 'unordered',
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left',
      bulletColor: '#1f2937',
      spacing: '0.5em'
    },
    'large': {
      listType: 'unordered',
      fontSize: '18px',
      color: '#1f2937',
      textAlign: 'left',
      bulletColor: '#3b82f6',
      spacing: '0.75em'
    },
    'numbered': {
      listType: 'ordered',
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left',
      spacing: '0.5em'
    }
  }
}; 