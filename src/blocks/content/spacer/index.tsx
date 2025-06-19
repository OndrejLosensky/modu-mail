import React from 'react';
import { Block, SpacerBlockProps as ISpacerBlockProps } from '@/types/blocks';
import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

interface SpacerComponentProps {
  block: Block & { props: ISpacerBlockProps };
  isSelected?: boolean;
}

export const SpacerBlock: React.FC<SpacerComponentProps> = ({ block, isSelected }) => {
  const { height = '20px' } = block.props;
  
  return (
    <div 
      className={`w-full transition-all ${isSelected ? 'relative outline outline-2 outline-blue-500 outline-offset-2' : ''}`}
      style={{ height }}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-blue-50/20 flex items-center justify-center">
          <span className="text-xs text-blue-500 font-medium">
            {height} spacing
          </span>
        </div>
      )}
    </div>
  );
};

export const spacerConfig: BaseComponentConfig = {
  id: 'spacer',
  type: 'spacer',
  label: 'Spacer',
  description: 'Add vertical spacing between elements',
  category: ComponentCategory.LAYOUT,
  icon: 'arrows-vertical',
  defaultProps: {
    height: '20px'
  },
  validation: {
    rules: {
      height: (value) => {
        if (typeof value !== 'string') return 'Height must be a string';
        if (!value.match(/^\d+(%|px|rem|em)$/)) {
          return 'Height must be a valid CSS unit (px, %, rem, em)';
        }
        return true;
      }
    }
  },
  presets: {
    'small': {
      height: '10px'
    },
    'medium': {
      height: '20px'
    },
    'large': {
      height: '40px'
    },
    'extra-large': {
      height: '80px'
    }
  }
}; 