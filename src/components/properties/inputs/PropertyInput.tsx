import React from 'react';
import { PropertyConfig, PropertyValue } from '@/types/editor';

interface PropertyInputProps {
  config: PropertyConfig;
  value: PropertyValue;
  onChange: (value: PropertyValue) => void;
}

export const PropertyInput: React.FC<PropertyInputProps> = ({ config, value, onChange }) => {
  const handleChange = (newValue: PropertyValue) => {
    // Apply validation if configured
    if (config.validation) {
      if (config.validation.required && !newValue) {
        return;
      }
      if (typeof newValue === 'string' && config.validation.pattern) {
        const pattern = new RegExp(config.validation.pattern);
        if (!pattern.test(newValue)) {
          return;
        }
      }
      if (typeof newValue === 'number') {
        if (config.validation.min !== undefined && newValue < config.validation.min) {
          return;
        }
        if (config.validation.max !== undefined && newValue > config.validation.max) {
          return;
        }
      }
      if (config.validation.custom && !config.validation.custom(newValue)) {
        return;
      }
    }

    // Apply transformation if configured
    const transformedValue = config.transform ? config.transform(newValue) : newValue;
    onChange(transformedValue);
  };

  switch (config.type) {
    case 'text':
      return (
        <textarea
          value={value as string || ''}
          onChange={(e) => handleChange(e.target.value)}
          rows={3}
          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          placeholder={`Enter ${config.label.toLowerCase()}...`}
        />
      );

    case 'url':
      return (
        <input
          type="url"
          value={value as string || ''}
          onChange={(e) => handleChange(e.target.value)}
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
              value={value as string || '#000000'}
              onChange={(e) => handleChange(e.target.value)}
              className="sr-only"
              id={`${config.key}-color-picker`}
            />
            <label 
              htmlFor={`${config.key}-color-picker`}
              className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
              style={{ 
                backgroundColor: value as string || '#000000',
                borderColor: value === '#ffffff' ? '#e5e7eb' : 'transparent'
              }}
            />
          </div>
          <input
            type="text"
            value={value as string || '#000000'}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          />
        </div>
      );

    case 'size':
      return (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={(value as string)?.replace(/[^0-9]/g, '') || ''}
            onChange={(e) => {
              const numValue = e.target.value.replace(/[^0-9]/g, '');
              handleChange(numValue ? `${numValue}px` : '');
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
              handleChange(numValue ? `${numValue}${unit}` : '');
            }}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          />
          <select
            value={unit}
            onChange={(e) => handleChange(`${size}${e.target.value}`)}
            className="px-1 py-1.5 border border-gray-200 rounded-md text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
        </div>
      );

    case 'select':
      return (
        <select
          value={value as string}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        >
          {config.options?.map((option) => (
            <option key={option.value as string} value={option.value as string}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case 'alignment':
      return (
        <div className="flex p-0.5 bg-white rounded-md shadow-sm">
          <button
            onClick={() => handleChange('left')}
            className={`flex-1 p-1.5 rounded ${
              value === 'left' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h10M4 18h12" />
            </svg>
          </button>
          <button
            onClick={() => handleChange('center')}
            className={`flex-1 p-1.5 rounded ${
              value === 'center' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M7 12h10M6 18h12" />
            </svg>
          </button>
          <button
            onClick={() => handleChange('right')}
            className={`flex-1 p-1.5 rounded ${
              value === 'right' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M10 12h10M8 18h12" />
            </svg>
          </button>
        </div>
      );

    case 'boolean':
      return (
        <button
          onClick={() => handleChange(!value)}
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

export default PropertyInput; 