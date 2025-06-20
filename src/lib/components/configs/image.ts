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
    defaultValue: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
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
    type: 'select',
    label: 'Width',
    category: PropertyCategory.Layout,
    defaultValue: '100%',
    options: [
      { label: 'Full Width', value: '100%' },
      { label: '75%', value: '75%' },
      { label: '50%', value: '50%' },
      { label: '25%', value: '25%' },
    ],
  })
  .addProperty({
    key: 'height',
    type: 'select',
    label: 'Height',
    category: PropertyCategory.Layout,
    defaultValue: '100%',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'Full Height', value: '100%' },
      { label: '75%', value: '75%' },
      { label: '50%', value: '50%' },
    ],
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