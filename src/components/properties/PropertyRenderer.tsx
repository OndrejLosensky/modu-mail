import React from 'react';
import { Block } from '@/types/blocks';
import { PropertyConfig, PropertyValue } from '@/types/editor';
import { componentConfigs } from '@/lib/components/configs';

interface PropertyRendererProps {
  block: Block;
  onUpdateBlock: (block: Block) => void;
}

export const PropertyRenderer: React.FC<PropertyRendererProps> = ({ block, onUpdateBlock }) => {
  const config = componentConfigs[block.type as keyof typeof componentConfigs];
  if (!config) return null;

  const handlePropertyChange = (key: string, value: PropertyValue) => {
    onUpdateBlock({
      ...block,
      props: {
        ...block.props,
        [key]: value
      }
    });
  };

  const renderProperty = (property: PropertyConfig) => {
    const value = block.props[property.key] ?? property.defaultValue;

    switch (property.type) {
      case 'text':
        return (
          <textarea
            value={value as string}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            rows={3}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            placeholder={`Enter ${property.label.toLowerCase()}...`}
          />
        );

      case 'url':
        return (
          <input
            type="url"
            value={value as string}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            placeholder="https://example.com"
          />
        );

      case 'color':
        return (
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <input
                type="color"
                value={value as string}
                onChange={(e) => handlePropertyChange(property.key, e.target.value)}
                className="sr-only"
                id={`${property.key}-color-picker`}
              />
              <label 
                htmlFor={`${property.key}-color-picker`}
                className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                style={{ 
                  backgroundColor: value as string,
                  borderColor: value === '#ffffff' ? '#e5e7eb' : 'transparent'
                }}
              />
            </div>
            <input
              type="text"
              value={value as string}
              onChange={(e) => handlePropertyChange(property.key, e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
          </div>
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          >
            {property.options?.map((option) => (
              <option key={option.value as string} value={option.value as string}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'size':
        return (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={(value as string)?.replace(/[^0-9]/g, '') || ''}
              onChange={(e) => {
                const numValue = e.target.value.replace(/[^0-9]/g, '');
                handlePropertyChange(property.key, numValue ? `${numValue}px` : '');
              }}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
            <span className="text-xs text-gray-500">px</span>
          </div>
        );

      case 'sizeWithUnit':
        const [size, unit] = (value as string)?.match(/^(\d+)(.*)$/)?.slice(1) || ['', 'px'];
        return (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={size}
              onChange={(e) => {
                const numValue = e.target.value.replace(/[^0-9]/g, '');
                handlePropertyChange(property.key, numValue ? `${numValue}${unit}` : '');
              }}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
            <select
              value={unit}
              onChange={(e) => handlePropertyChange(property.key, `${size}${e.target.value}`)}
              className="px-1 py-1.5 border border-gray-200 rounded-md text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="px">px</option>
              <option value="%">%</option>
            </select>
          </div>
        );

      case 'sizePresets':
        const customValue = (value as string)?.match(/^(\d+)px$/)?.[1] || '';
        const isCustom = !property.options?.some(opt => opt.value === value);
        return (
          <div className="space-y-2">
            <select
              value={isCustom ? 'custom' : value as string}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue === 'custom') {
                  handlePropertyChange(property.key, customValue ? `${customValue}px` : '20px');
                } else {
                  handlePropertyChange(property.key, newValue);
                }
              }}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              {property.options?.map((option) => (
                <option key={option.value as string} value={option.value as string}>
                  {option.label}
                </option>
              ))}
              <option value="custom">Custom Size</option>
            </select>
            {isCustom && (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => {
                    const numValue = e.target.value.replace(/[^0-9]/g, '');
                    handlePropertyChange(property.key, numValue ? `${numValue}px` : '');
                  }}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  placeholder="Enter size in pixels..."
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            )}
          </div>
        );

      case 'boolean':
        return (
          <button
            onClick={() => handlePropertyChange(property.key, !value)}
            className={`px-2.5 py-1.5 rounded-md text-sm font-medium ${
              value ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
            }`}
          >
            {value ? 'Enabled' : 'Disabled'}
          </button>
        );

      default:
        return null;
    }
  };

  // Group properties by category
  const groupedProperties = config.properties.reduce<Record<string, PropertyConfig[]>>((acc: Record<string, PropertyConfig[]>, property: PropertyConfig) => {
    const category = property.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(property);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {(Object.entries(groupedProperties) as [string, PropertyConfig[]][]).map(([category, properties]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <div className="space-y-4">
            {properties.map((property: PropertyConfig) => (
              <div key={property.key} className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700">
                  {property.label}
                  {property.description && (
                    <span className="ml-1 text-gray-400">{property.description}</span>
                  )}
                </label>
                {renderProperty(property)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 