import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, ListBlockProps } from '@/types/blocks';
import { BlockHTMLConfig } from '@/lib/export/html/types';
import { textBlockStyles, buttonBlockStyles, imageBlockStyles, dividerBlockStyles, listBlockStyles } from './styles';

export const blockConfigs: Record<string, BlockHTMLConfig> = {
  text: {
    tag: 'p',
    styleGenerator: textBlockStyles,
    innerContentGenerator: (block: Block) => (block.props as TextBlockProps).text || '',
  },
  button: {
    tag: 'a',
    styleGenerator: buttonBlockStyles,
    attributeGenerator: (block: Block) => ({
      href: (block.props as ButtonBlockProps).href || '#',
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
    innerContentGenerator: (block: Block) => (block.props as ButtonBlockProps).text || 'Click here',
  },
  image: {
    tag: 'img',
    styleGenerator: imageBlockStyles,
    attributeGenerator: (block: Block) => ({
      src: (block.props as ImageBlockProps).src || '',
      alt: (block.props as ImageBlockProps).alt || '',
    }),
  },
  divider: {
    tag: 'hr',
    styleGenerator: dividerBlockStyles,
  },
  list: {
    tag: 'ul',
    styleGenerator: listBlockStyles,
    attributeGenerator: (block: Block) => {
      const props = block.props as ListBlockProps;
      if (props.listType === 'ordered') {
        return { 'data-type': 'ordered' };
      }
      return { 'data-type': 'unordered' };
    },
    innerContentGenerator: (block: Block) => {
      const props = block.props as ListBlockProps;
      const items = props.items || ['First item', 'Second item', 'Third item'];
      const bulletColor = props.bulletColor || '#1f2937';
      const listTag = props.listType === 'ordered' ? 'ol' : 'ul';
      
      const itemsHtml = items.map(item => {
        if (props.listType === 'ordered') {
          return `<li style="color: ${props.color}">${item}</li>`;
        } else {
          return `<li style="color: ${props.color}; list-style-type: disc; --bullet-color: ${bulletColor}">${item}</li>`;
        }
      }).join('\n');

      return `<${listTag} style="list-style-position: inside; padding-left: 0;">${itemsHtml}</${listTag}>`;
    },
  },
}; 