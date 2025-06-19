import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export const imageConfig: BaseComponentConfig = {
  id: 'image',
  type: 'image',
  category: ComponentCategory.MEDIA,
  label: 'Image',
  description: 'An image block with customizable properties',
  defaultProps: {
    src: 'https://via.placeholder.com/600x400',
    alt: 'Image description',
    width: '100%',
    height: 'auto',
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
        if (!value.match(/^\d+(%|px|rem|em|auto)$/)) {
          return 'Width must be a valid CSS unit (px, %, rem, em, auto)';
        }
        return true;
      },
      height: (value) => {
        if (typeof value !== 'string') return 'Height must be a string';
        if (!value.match(/^\d+(%|px|rem|em|auto)$/)) {
          return 'Height must be a valid CSS unit (px, %, rem, em, auto)';
        }
        return true;
      }
    }
  },
  presets: {
    'full-width': {
      width: '100%',
      height: 'auto',
      borderRadius: '0px',
    },
    'rounded': {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    },
    'circle': {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    'thumbnail': {
      width: '100px',
      height: '100px',
      borderRadius: '4px',
      objectFit: 'cover',
    }
  }
}; 