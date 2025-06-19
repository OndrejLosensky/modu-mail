import React from 'react';
import { Block } from '@/types/blocks';

interface ImageBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block, isSelected }) => {
  const { 
    src, 
    alt,
    textAlign = 'left'
  } = block.props;

  return (
    <div className={`
      p-4 flex
      ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'}
    `}>
      <div 
        className={`
          relative w-full max-w-2xl border-2 border-dashed rounded-lg overflow-hidden
          ${isSelected ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'}
        `}
        style={{ minHeight: '240px' }}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt || ''} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full p-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">No image selected</p>
                <p className="text-sm text-gray-500 mt-1">Add image URL in properties</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 