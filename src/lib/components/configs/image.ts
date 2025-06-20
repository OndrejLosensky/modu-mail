import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';
import { TextAlignment } from '@/types/blocks';

interface ImageBlockProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  alignment: TextAlignment;
  borderRadius: string;
  link: string;
}

const { component, html } = new ComponentBuilder<ImageBlockProps>('image')
  .setName('Image')
  .setDescription('Add an image to your email')
  .setCategory(ComponentCategory.Media)
  .setIcon('image')
  .addProperty({
    key: 'src',
    type: 'url',
    label: 'Image URL',
    category: PropertyCategory.Content,
    defaultValue: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop',
  })
  .addProperty({
    key: 'alt',
    type: 'text',
    label: 'Alt Text',
    category: PropertyCategory.Content,
    defaultValue: 'Image description',
  })
  .addProperty({
    key: 'width',
    type: 'sizeWithUnit',
    label: 'Width',
    category: PropertyCategory.Layout,
    defaultValue: '100%',
  })
  .addProperty({
    key: 'height',
    type: 'sizeWithUnit',
    label: 'Height',
    category: PropertyCategory.Layout,
    defaultValue: '164px',
  })
  .addProperty({
    key: 'alignment',
    type: 'select',
    label: 'Alignment',
    category: PropertyCategory.Layout,
    defaultValue: 'center',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  })
  .addProperty({
    key: 'borderRadius',
    type: 'size',
    label: 'Border Radius',
    category: PropertyCategory.Style,
    defaultValue: '0',
  })
  .addProperty({
    key: 'link',
    type: 'url',
    label: 'Link URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .setHtmlTag('table')
  .setAttributeGenerator((block) => {
    const props = block.props as unknown as ImageBlockProps;
    return {
      role: 'presentation',
      cellpadding: '0',
      cellspacing: '0',
      border: '0',
      width: '100%',
      align: props.alignment,
    };
  })
  .setInnerContentGenerator((block) => {
    const props = block.props as unknown as ImageBlockProps;
    const borderRadius = props.borderRadius ? `${props.borderRadius}px` : '0';

    const imageHtml = `<img 
      src="${props.src}" 
      alt="${props.alt}" 
      width="${props.width}" 
      height="${props.height}"
      style="
        display: block; 
        max-width: 100%; 
        height: ${props.height}; 
        border-radius: ${borderRadius};
        margin: 0 auto;
      "
    />`;

    const content = props.link 
      ? `<a href="${props.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">${imageHtml}</a>`
      : imageHtml;

    return `
      <tr>
        <td align="${props.alignment}" style="text-align: ${props.alignment};">
          ${content}
        </td>
      </tr>
    `;
  })
  .build();

export const imageConfig = component;
export const imageHtmlConfig = html; 