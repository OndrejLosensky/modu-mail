import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';

interface ImageBlockProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  alignment: string;
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
    defaultValue: 'https://via.placeholder.com/600x400',
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
    type: 'text',
    label: 'Width',
    category: PropertyCategory.Layout,
    defaultValue: '100%',
  })
  .addProperty({
    key: 'height',
    type: 'text',
    label: 'Height',
    category: PropertyCategory.Layout,
    defaultValue: 'auto',
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
    type: 'select',
    label: 'Border Radius',
    category: PropertyCategory.Style,
    defaultValue: '0px',
    options: [
      { label: 'None', value: '0px' },
      { label: 'Small', value: '4px' },
      { label: 'Medium', value: '8px' },
      { label: 'Large', value: '16px' },
      { label: 'Round', value: '9999px' },
    ],
  })
  .addProperty({
    key: 'link',
    type: 'url',
    label: 'Link URL',
    category: PropertyCategory.Content,
    defaultValue: '',
  })
  .setHtmlTag('table')
  .setAttributeGenerator((block) => ({
    role: 'presentation',
    cellpadding: '0',
    cellspacing: '0',
    border: '0',
    width: '100%',
    align: block.props.alignment,
  }))
  .setInnerContentGenerator((block) => {
    const imageHtml = `<img 
      src="${block.props.src}" 
      alt="${block.props.alt}" 
      width="${block.props.width}" 
      height="${block.props.height}"
      style="display: block; max-width: 100%; height: auto; border-radius: ${block.props.borderRadius};"
    />`;

    const content = block.props.link 
      ? `<a href="${block.props.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">${imageHtml}</a>`
      : imageHtml;

    return `
      <tr>
        <td align="${block.props.alignment}">
          ${content}
        </td>
      </tr>
    `;
  })
  .build();

export const imageConfig = component;
export const imageHtmlConfig = html; 