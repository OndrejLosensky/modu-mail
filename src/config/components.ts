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
      content: 'New text block',
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left'
    }
  },
  {
    type: 'button',
    icon: '⚡',
    label: 'Button',
    description: 'Add a clickable button',
    category: 'interactive',
    defaultProps: {
      text: 'Click me',
      href: '#',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      fontSize: '16px',
      padding: '12px 24px',
      borderRadius: '6px',
      align: 'left'
    }
  },
  {
    type: 'image',
    icon: '🖼️',
    label: 'Image',
    description: 'Add an image',
    category: 'media',
    defaultProps: {
      src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
      alt: 'Image description',
      width: '100%',
      height: 'auto'
    }
  },
  {
    type: 'divider',
    icon: '—',
    label: 'Divider',
    description: 'Add a horizontal line to separate content',
    category: 'content',
    defaultProps: {
      color: '#e5e7eb',
      height: '1px'
    }
  },
  {
    type: 'spacer',
    icon: '↕',
    label: 'Spacer',
    description: 'Add vertical spacing between blocks',
    category: 'layout',
    defaultProps: {
      height: '20px'
    }
  },
  {
    type: 'list',
    icon: '•',
    label: 'List',
    description: 'Add a bulleted or numbered list',
    category: 'content',
    defaultProps: {
      items: ['First item', 'Second item', 'Third item'],
      listType: 'unordered',
      fontSize: '16px',
      color: '#1f2937',
      textAlign: 'left',
      bulletColor: '#1f2937',
      spacing: '8px'
    }
  },
  {
    type: 'social',
    icon: '🔗',
    label: 'Social Links',
    description: 'Add social media links with icons',
    category: 'interactive',
    defaultProps: {
      networks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ],
      iconSize: '24px',
      spacing: '16px',
      alignment: 'center'
    }
  }
]; 