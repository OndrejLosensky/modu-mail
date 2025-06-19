import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BlockType } from '@/types/blocks';

interface DraggableBlockProps {
  type: BlockType;
  icon: string;
  label: string;
  description?: string;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ type, icon, label, description }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${type}`,
    data: { type }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group relative p-3 border rounded-lg cursor-grab active:cursor-grabbing
        ${isDragging ? 'border-dashed border-gray-200 bg-gray-50' : 'bg-white hover:border-blue-500'}
      `}
    >
      <div className={`flex items-center gap-3 ${isDragging ? 'invisible' : ''}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-50 text-lg text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 font-medium">{label}</span>
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      </div>
      <div className={`
        absolute inset-y-0 right-3 flex items-center text-gray-400 group-hover:text-blue-500 transition-colors
        ${isDragging ? 'invisible' : ''}
      `}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
        </svg>
      </div>
    </div>
  );
};

export const ComponentsSidebar = () => {
  return (
    <div className="w-72 border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-900">Components</h2>
        <p className="text-xs text-gray-600 mt-1">Drag and drop to build your email</p>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Content</h3>
          <DraggableBlock
            type="text"
            icon="T"
            label="Text Block"
            description="Add a paragraph or heading"
          />
          <DraggableBlock
            type="list"
            icon="•"
            label="List"
            description="Add a bulleted or numbered list"
          />
          <DraggableBlock
            type="image"
            icon="🖼"
            label="Image"
            description="Upload or embed an image"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Interactive</h3>
          <DraggableBlock
            type="button"
            icon="↗"
            label="Button"
            description="Add a call-to-action button"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Layout</h3>
          <DraggableBlock
            type="divider"
            icon="—"
            label="Divider"
            description="Add a horizontal separator"
          />
        </div>
      </div>
    </div>
  );
}; 