import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BlockType } from '@/types/blocks';

interface DraggableBlockProps {
  type: BlockType;
  icon: React.ReactNode;
  label: string;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ type, icon, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `template-${type}`,
    data: { type }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-4 border rounded-lg bg-white hover:border-blue-500 cursor-move flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
    >
      <span className="text-lg text-gray-800">{icon}</span>
      <span className="text-sm text-gray-900 font-medium">{label}</span>
    </div>
  );
};

export const ComponentsSidebar = () => {
  return (
    <div className="w-64 border-r bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Components</h2>
      <div className="text-xs text-gray-600 mb-3">Drag or click to add</div>
      <div className="space-y-2">
        <DraggableBlock
          type="text"
          icon="T"
          label="Text"
        />
        <DraggableBlock
          type="image"
          icon="🖼"
          label="Image"
        />
        <DraggableBlock
          type="button"
          icon="↗"
          label="Button"
        />
        <DraggableBlock
          type="divider"
          icon="—"
          label="Divider"
        />
      </div>
    </div>
  );
}; 