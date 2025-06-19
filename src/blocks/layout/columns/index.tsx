import React from 'react';
import { Block, ColumnsBlockProps as IColumnsBlockProps } from '@/types/blocks';
import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

interface ColumnsComponentProps {
  block: Block & { props: IColumnsBlockProps };
  isSelected?: boolean;
}

export const ColumnsBlock: React.FC<ColumnsComponentProps> = ({ block, isSelected }) => {
  const { 
    columnRatio = '1:1',
    spacing = '20px',
    verticalAlignment = 'top',
    backgroundColor = 'transparent',
    padding = '0px'
  } = block.props;

  const [leftRatio, rightRatio] = columnRatio.split(':').map(Number);
  const leftWidth = `${(leftRatio / (leftRatio + rightRatio)) * 100}%`;
  const rightWidth = `${(rightRatio / (leftRatio + rightRatio)) * 100}%`;

  return (
    <div 
      className={`w-full transition-all ${isSelected ? 'outline outline-2 outline-blue-500 outline-offset-2' : ''}`}
      style={{ backgroundColor, padding }}
    >
      <div 
        className="flex flex-wrap"
        style={{ 
          gap: spacing,
          alignItems: verticalAlignment === 'middle' ? 'center' : verticalAlignment === 'bottom' ? 'flex-end' : 'flex-start'
        }}
      >
        <div style={{ width: `calc(${leftWidth} - ${parseInt(spacing) / 2}px)` }}>
          {/* Left column content placeholder */}
          <div className="min-h-[100px] bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-400">Left Column</span>
          </div>
        </div>
        <div style={{ width: `calc(${rightWidth} - ${parseInt(spacing) / 2}px)` }}>
          {/* Right column content placeholder */}
          <div className="min-h-[100px] bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-400">Right Column</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const columnsConfig: BaseComponentConfig = {
  id: 'columns',
  type: 'columns',
  label: 'Two Columns',
  description: 'Create a two-column layout',
  category: ComponentCategory.LAYOUT,
  icon: 'columns',
  defaultProps: {
    columnRatio: '1:1',
    spacing: '20px',
    verticalAlignment: 'top',
    backgroundColor: 'transparent',
    padding: '0px'
  },
  validation: {
    rules: {
      columnRatio: (value) => {
        if (typeof value !== 'string') return 'Column ratio must be a string';
        const [left, right] = value.split(':').map(Number);
        if (isNaN(left) || isNaN(right)) return 'Invalid column ratio format';
        if (left <= 0 || right <= 0) return 'Column ratios must be positive numbers';
        return true;
      },
      spacing: (value) => {
        if (typeof value !== 'string') return 'Spacing must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Spacing must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      },
      verticalAlignment: (value) => {
        if (!['top', 'middle', 'bottom'].includes(value as string)) {
          return 'Vertical alignment must be one of: top, middle, bottom';
        }
        return true;
      }
    }
  },
  presets: {
    'equal': {
      columnRatio: '1:1',
      spacing: '20px',
      verticalAlignment: 'top'
    },
    'golden-ratio': {
      columnRatio: '1.618:1',
      spacing: '20px',
      verticalAlignment: 'top'
    },
    'wide-left': {
      columnRatio: '2:1',
      spacing: '20px',
      verticalAlignment: 'top'
    },
    'wide-right': {
      columnRatio: '1:2',
      spacing: '20px',
      verticalAlignment: 'top'
    }
  }
}; 