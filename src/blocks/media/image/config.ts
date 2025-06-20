import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const imageConfig: BaseComponentConfig = {
  id: 'image',
  type: 'image',
  category: ComponentCategory.Media,
  label: 'Image',
  description: 'An image block with customizable properties',
  defaultProps: {
    src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
    alt: 'Image description',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0px',
    align: 'center',
  },
  validation: {
    required: ['src', 'alt'],
    rules: {
      src: (value) => {
        if (typeof value !== 'string') return 'Image URL must be a string';
        try {
          new URL(value);
          return true;
        } catch {
          if (value.startsWith('/')) return true;
          return 'Invalid image URL format';
        }
      },
      width: (value) => {
        if (typeof value !== 'string') return 'Width must be a string';
        if (!value.match(/^(\d+%|auto)$/)) {
          return 'Width must be a percentage value or auto';
        }
        return true;
      },
      height: (value) => {
        if (typeof value !== 'string') return 'Height must be a string';
        if (!value.match(/^(\d+%|auto)$/)) {
          return 'Height must be a percentage value or auto';
        }
        return true;
      }
    }
  },
  presets: {
    'full-width': {
      width: '100%',
      height: '100%',
      borderRadius: '0px',
    },
    'rounded': {
      width: '100%',
      height: '100%',
      borderRadius: '8px',
    },
    'square': {
      width: '50%',
      height: '50%',
      borderRadius: '0px',
      objectFit: 'cover',
    },
    'thumbnail': {
      width: '25%',
      height: '25%',
      borderRadius: '4px',
      objectFit: 'cover',
    }
  }
}; 