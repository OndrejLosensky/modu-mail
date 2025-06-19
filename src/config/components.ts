import { BlockType, BlockProps } from '@/types/blocks';

export interface ComponentConfig {
  type: BlockType;
  icon: string;
  label: string;
  description: string;
  category: 'content' | 'media' | 'interactive' | 'layout';
  defaultProps: BlockProps;
}

export const components: ComponentConfig[] = [
  {
    type: 'text',
    icon: 'T',
    label: 'Text Block',
    description: 'Add a paragraph of text with customizable styling',
    category: 'content',
    defaultProps: {
      text: 'New text block',
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left'
    }
  },
  {
    type: 'image',
    icon: '🖼',
    label: 'Image',
    description: 'Insert an image with alt text for accessibility',
    category: 'media',
    defaultProps: {
      src: 'https://via.placeholder.com/600x400',
      alt: 'Image description',
      width: '100%',
      height: 'auto'
    }
  },
  {
    type: 'button',
    icon: '↗',
    label: 'Button',
    description: 'Add a clickable button with custom styling',
    category: 'interactive',
    defaultProps: {
      text: 'Click me',
      href: '#',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#3b82f6',
      textAlign: 'left',
      borderRadius: '6px',
      padding: '10px 20px'
    }
  },
  {
    type: 'divider',
    icon: '—',
    label: 'Divider',
    description: 'Add a horizontal line to separate content',
    category: 'layout',
    defaultProps: {
      color: '#e5e7eb',
      height: '1px',
      margin: '10px 0'
    }
  },
  {
    type: 'list',
    icon: '•',
    label: 'List',
    description: 'Create ordered or unordered lists',
    category: 'content',
    defaultProps: {
      items: ['First item', 'Second item', 'Third item'],
      listType: 'unordered',
      fontSize: '16px',
      color: '#1f2937',
      bulletColor: '#1f2937',
      spacing: '0.5em',
      textAlign: 'left'
    }
  }
]; 