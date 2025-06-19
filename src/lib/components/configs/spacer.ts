import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';

const { component, html } = new ComponentBuilder('spacer')
  .setName('Spacer')
  .setDescription('Add vertical spacing between blocks')
  .setCategory(ComponentCategory.Layout)
  .setIcon('spacer')
  .addProperty({
    key: 'height',
    type: 'select',
    label: 'Height',
    category: PropertyCategory.Layout,
    defaultValue: '20px',
    options: [
      { label: 'Extra Small (10px)', value: '10px' },
      { label: 'Small (20px)', value: '20px' },
      { label: 'Medium (40px)', value: '40px' },
      { label: 'Large (60px)', value: '60px' },
      { label: 'Extra Large (80px)', value: '80px' },
    ],
  })
  .setHtmlTag('div')
  .setInnerContentGenerator(() => '&nbsp;')
  .build();

export const spacerConfig = component;
export const spacerHtmlConfig = html; 