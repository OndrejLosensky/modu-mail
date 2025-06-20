import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';

const { component } = new ComponentBuilder('container')
  .setName('Container')
  .setDescription('A container to group and align content')
  .setCategory(ComponentCategory.Layout)
  .setIcon('container')
  .addProperty({
    key: 'maxWidth',
    type: 'size',
    label: 'Max Width',
    category: PropertyCategory.Layout,
    defaultValue: '600px',
  })
  .addProperty({
    key: 'padding',
    type: 'size',
    label: 'Padding',
    category: PropertyCategory.Layout,
    defaultValue: '20px',
  })
  .addProperty({
    key: 'backgroundColor',
    type: 'color',
    label: 'Background Color',
    category: PropertyCategory.Style,
    defaultValue: '#ffffff',
  })
  .addProperty({
    key: 'align',
    type: 'select',
    label: 'Content Alignment',
    category: PropertyCategory.Layout,
    defaultValue: 'left',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  })
  .build();

export const containerConfig = component; 