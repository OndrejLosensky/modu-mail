import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const buttonConfig: BaseComponentConfig = {
  id: 'button',
  type: 'button',
  category: ComponentCategory.INTERACTIVE,
  label: 'Button',
  description: 'A clickable button element with customizable styles',
  defaultProps: {
    text: 'Click me',
    href: '#',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '16px',
    padding: '12px 24px',
    borderRadius: '6px',
    align: 'left',
  },
  validation: {
    required: ['text', 'href'],
    rules: {
      href: (value) => {
        if (typeof value !== 'string') return 'URL must be a string';
        try {
          new URL(value);
          return true;
        } catch {
          if (value.startsWith('#') || value.startsWith('/')) return true;
          return 'Invalid URL format';
        }
      }
    }
  },
  presets: {
    'primary': {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '12px 24px',
    },
    'secondary': {
      backgroundColor: '#6b7280',
      color: '#ffffff',
      padding: '12px 24px',
    },
    'outline': {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      padding: '11px 23px',
      border: '1px solid #3b82f6',
    },
    'large': {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '16px 32px',
      fontSize: '18px',
    }
  }
}; 