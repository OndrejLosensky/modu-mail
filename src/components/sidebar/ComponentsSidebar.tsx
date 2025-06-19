import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { components } from '@/config/components';

const categoryLabels = {
  content: 'Content',
  media: 'Media',
  interactive: 'Interactive',
  layout: 'Layout'
};

export const ComponentsSidebar: React.FC = () => {
  // Group components by category
  const componentsByCategory = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div className="w-72 border-r bg-white h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-900 uppercase">Components</h2>
      </div>
      <div className="py-2">
        {Object.entries(componentsByCategory).map(([category, categoryComponents]) => (
          <div key={category} className="mb-6">
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
            </div>
            <div className="px-4 space-y-3">
              {categoryComponents.map((component) => (
                <DraggableComponent
                  key={component.type}
                  type={component.type}
                  icon={component.icon}
                  label={component.label}
                  description={component.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DraggableComponentProps {
  type: string;
  icon: string;
  label: string;
  description: string;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ type, icon, label, description }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${type}`,
    data: {
      type,
      isNew: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group flex items-start gap-3 p-3 border rounded-lg cursor-grab active:cursor-grabbing transition-all
        ${isDragging ? 'opacity-50 scale-105 border-blue-200 bg-blue-50' : 'hover:bg-gray-50 hover:border-gray-300'}
        bg-white border-gray-200
      `}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-50 text-lg text-gray-700 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-xs text-gray-500 truncate">{description}</span>
      </div>
      <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5v14m6-14v14M4 9h16M4 15h16" />
        </svg>
      </div>
    </div>
  );
}; 