import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { components } from '@/config/components';

const categoryLabels = {
  content: 'Content',
  media: 'Media',
  interactive: 'Interactive',
  layout: 'Layout',
  social: 'Social'
};

interface DraggableComponentProps {
  type: string;
  icon: string;
  label: string;
  description: string;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ type, icon, label, description }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `new-${type}`,
    data: {
      type,
      isNew: true
    }
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
      className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 cursor-move hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{icon}</span>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{label}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
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