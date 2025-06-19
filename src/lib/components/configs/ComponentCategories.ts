export enum ComponentCategory {
  LAYOUT = 'layout',
  CONTENT = 'content',
  MEDIA = 'media',
  INTERACTIVE = 'interactive',
  SOCIAL = 'social',
  CUSTOM = 'custom'
}

export interface CategoryConfig {
  id: ComponentCategory;
  label: string;
  description: string;
  icon?: string;
}

export const COMPONENT_CATEGORIES: Record<ComponentCategory, CategoryConfig> = {
  [ComponentCategory.LAYOUT]: {
    id: ComponentCategory.LAYOUT,
    label: 'Layout',
    description: 'Structural components like containers, columns, and spacers',
  },
  [ComponentCategory.CONTENT]: {
    id: ComponentCategory.CONTENT,
    label: 'Content',
    description: 'Text, headings, and other content elements',
  },
  [ComponentCategory.MEDIA]: {
    id: ComponentCategory.MEDIA,
    label: 'Media',
    description: 'Images, videos, and other media components',
  },
  [ComponentCategory.INTERACTIVE]: {
    id: ComponentCategory.INTERACTIVE,
    label: 'Interactive',
    description: 'Buttons, links, and other clickable elements',
  },
  [ComponentCategory.SOCIAL]: {
    id: ComponentCategory.SOCIAL,
    label: 'Social',
    description: 'Social media links and sharing components',
  },
  [ComponentCategory.CUSTOM]: {
    id: ComponentCategory.CUSTOM,
    label: 'Custom',
    description: 'User-defined custom components',
  }
}; 