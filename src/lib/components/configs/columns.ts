import { ComponentBuilder } from '../ComponentBuilder';
import { ComponentCategory } from './ComponentCategories';
import { PropertyCategory } from '@/types/editor';

interface ColumnsBlockProps {
  ratio: string;
  spacing: string;
  verticalAlignment: string;
  backgroundColor: string;
  padding: string;
}

const { component, html } = new ComponentBuilder<ColumnsBlockProps>('columns')
  .setName('Two Columns')
  .setDescription('Create a two-column layout')
  .setCategory(ComponentCategory.Layout)
  .setIcon('columns')
  .addProperty({
    key: 'ratio',
    type: 'select',
    label: 'Column Ratio',
    category: PropertyCategory.Layout,
    defaultValue: '1:1',
    options: [
      { label: 'Equal (1:1)', value: '1:1' },
      { label: 'Golden Ratio', value: '1.618:1' },
      { label: 'Wide Left (2:1)', value: '2:1' },
      { label: 'Wide Right (1:2)', value: '1:2' },
    ],
  })
  .addProperty({
    key: 'spacing',
    type: 'select',
    label: 'Column Spacing',
    category: PropertyCategory.Layout,
    defaultValue: '20px',
    options: [
      { label: 'None', value: '0px' },
      { label: 'Small (10px)', value: '10px' },
      { label: 'Medium (20px)', value: '20px' },
      { label: 'Large (40px)', value: '40px' },
    ],
  })
  .addProperty({
    key: 'verticalAlignment',
    type: 'select',
    label: 'Vertical Alignment',
    category: PropertyCategory.Layout,
    defaultValue: 'top',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Middle', value: 'middle' },
      { label: 'Bottom', value: 'bottom' },
    ],
  })
  .addProperty({
    key: 'backgroundColor',
    type: 'color',
    label: 'Background Color',
    category: PropertyCategory.Style,
    defaultValue: 'transparent',
  })
  .addProperty({
    key: 'padding',
    type: 'select',
    label: 'Padding',
    category: PropertyCategory.Layout,
    defaultValue: '0px',
    options: [
      { label: 'None', value: '0px' },
      { label: 'Small (10px)', value: '10px' },
      { label: 'Medium (20px)', value: '20px' },
      { label: 'Large (40px)', value: '40px' },
    ],
  })
  .setHtmlTag('table')
  .setAttributeGenerator((block) => ({
    role: 'presentation',
    cellpadding: '0',
    cellspacing: '0',
    border: '0',
    width: '100%',
    style: {
      backgroundColor: block.props.backgroundColor,
      padding: block.props.padding,
    },
  }))
  .setInnerContentGenerator((block) => {
    const ratioValues = block.props.ratio.split(':').map(Number);
    const totalParts = ratioValues[0] + ratioValues[1];
    const firstColumnWidth = `${(ratioValues[0] / totalParts) * 100}%`;
    const secondColumnWidth = `${(ratioValues[1] / totalParts) * 100}%`;

    return `
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="${firstColumnWidth}" valign="${block.props.verticalAlignment}" style="padding-right: ${block.props.spacing};">
                <!-- First column content placeholder -->
                &nbsp;
              </td>
              <td width="${secondColumnWidth}" valign="${block.props.verticalAlignment}">
                <!-- Second column content placeholder -->
                &nbsp;
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  })
  .build();

export const columnsConfig = component;
export const columnsHtmlConfig = html; 