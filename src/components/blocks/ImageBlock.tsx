import React from 'react';
import { Block } from '@/types/blocks';

interface ImageBlockProps {
  block: Block;
  isSelected: boolean;
  onUpdate: (block: Block) => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block, isSelected }) => {
  const { src, alt } = block.props;

  return (
    <div 
      className={`
        relative aspect-video border-2 border-dashed rounded-lg overflow-hidden
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'}
      `}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt || ''} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
          <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">IMAGE PLACEHOLDER</span>
        </div>
      )}
    </div>
  );
}; 