export enum ComponentCategory {
  Layout = 'layout',
  Content = 'content',
  Interactive = 'interactive',
  Media = 'media',
  Social = 'social',
  Custom = 'custom'
}

export interface CategoryConfig {
  id: ComponentCategory;
  label: string;
  description: string;
  icon?: string;
}

export const COMPONENT_CATEGORIES: Record<ComponentCategory, CategoryConfig> = {
  [ComponentCategory.Layout]: {
    id: ComponentCategory.Layout,
    label: 'Layout',
    description: 'Structural components like containers, columns, and spacers',
  },
  [ComponentCategory.Content]: {
    id: ComponentCategory.Content,
    label: 'Content',
    description: 'Text, headings, and other content elements',
  },
  [ComponentCategory.Media]: {
    id: ComponentCategory.Media,
    label: 'Media',
    description: 'Images, videos, and other media components',
  },
  [ComponentCategory.Interactive]: {
    id: ComponentCategory.Interactive,
    label: 'Interactive',
    description: 'Buttons, links, and other clickable elements',
  },
  [ComponentCategory.Social]: {
    id: ComponentCategory.Social,
    label: 'Social',
    description: 'Social media components and integrations',
  },
  [ComponentCategory.Custom]: {
    id: ComponentCategory.Custom,
    label: 'Custom',
    description: 'Custom components and templates',
  },
}; 