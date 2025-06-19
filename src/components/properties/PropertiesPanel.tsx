import React from 'react';
import { Block } from '@/types/blocks';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdateBlock?: (block: Block) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedBlock,
  onUpdateBlock 
}) => {
  if (!selectedBlock || !onUpdateBlock) {
    return (
      <div className="w-80 border-l border-gray-200 bg-gray-50/50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-sm font-medium text-gray-900">Properties</h2>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 text-center mt-4">
            Select a component to edit its properties
          </div>
        </div>
      </div>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        text: e.target.value
      }
    });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        fontSize: e.target.value + 'px'
      }
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'color' | 'backgroundColor' = 'color') => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        [type]: e.target.value
      }
    });
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        textAlign: alignment
      }
    });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        href: e.target.value
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleDividerChange = (e: React.ChangeEvent<HTMLInputElement>, property: 'height' | 'color') => {
    onUpdateBlock({
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        [property]: property === 'height' ? e.target.value + 'px' : e.target.value
      }
    });
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-gray-50/50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="text-sm font-medium text-gray-900">Properties</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Component Type */}
        <div className="inline-flex px-2.5 py-1 bg-white rounded-md shadow-sm">
          <span className="text-xs font-medium text-gray-600 uppercase">
            {selectedBlock.type}
          </span>
        </div>

        {/* Text Content */}
        {(selectedBlock.type === 'text' || selectedBlock.type === 'button') && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              {selectedBlock.type === 'button' ? 'Button Text' : 'Text Content'}
            </label>
            <textarea
              value={selectedBlock.props.text || ''}
              onChange={handleTextChange}
              rows={selectedBlock.type === 'button' ? 1 : 3}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              placeholder={selectedBlock.type === 'button' ? 'Get Started' : 'Enter text...'}
            />
          </div>
        )}

        {/* Link URL (for buttons) */}
        {selectedBlock.type === 'button' && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Link URL
            </label>
            <input
              type="url"
              value={selectedBlock.props.href || ''}
              onChange={handleLinkChange}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              placeholder="https://example.com"
            />
          </div>
        )}

        {/* Image Properties */}
        {selectedBlock.type === 'image' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="src"
                value={selectedBlock.props.src || ''}
                onChange={handleImageChange}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Alt Text
              </label>
              <input
                type="text"
                name="alt"
                value={selectedBlock.props.alt || ''}
                onChange={handleImageChange}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                placeholder="Image description"
              />
            </div>
          </>
        )}

        {/* Divider Properties */}
        {selectedBlock.type === 'divider' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Height
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={selectedBlock.props.height?.replace('px', '') || '1'}
                  onChange={(e) => handleDividerChange(e, 'height')}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Color
              </label>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <input
                    type="color"
                    value={selectedBlock.props.color || '#e5e7eb'}
                    onChange={(e) => handleDividerChange(e, 'color')}
                    className="sr-only"
                    id="divider-color-picker"
                  />
                  <label 
                    htmlFor="divider-color-picker"
                    className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                    style={{ 
                      backgroundColor: selectedBlock.props.color || '#e5e7eb',
                      borderColor: selectedBlock.props.color === '#ffffff' ? '#e5e7eb' : 'transparent'
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={selectedBlock.props.color || '#e5e7eb'}
                  onChange={(e) => handleDividerChange(e, 'color')}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
              </div>
            </div>
          </>
        )}

        {/* Font Size and Color Row */}
        {(selectedBlock.type === 'text' || selectedBlock.type === 'button') && (
          <div className="grid grid-cols-2 gap-4">
            {/* Font Size */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Font Size
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={selectedBlock.props.fontSize?.replace('px', '') || (selectedBlock.type === 'button' ? '16' : '24')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    handleFontSizeChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Color
              </label>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <input
                    type="color"
                    value={selectedBlock.props.color || '#1f2937'}
                    onChange={(e) => handleColorChange(e, 'color')}
                    className="sr-only"
                    id="text-color-picker"
                  />
                  <label 
                    htmlFor="text-color-picker"
                    className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                    style={{ 
                      backgroundColor: selectedBlock.props.color || '#1f2937',
                      borderColor: selectedBlock.props.color === '#ffffff' ? '#e5e7eb' : 'transparent'
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={selectedBlock.props.color || '#1f2937'}
                  onChange={(e) => handleColorChange(e, 'color')}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Background Color (for buttons) */}
        {selectedBlock.type === 'button' && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Background
            </label>
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <input
                  type="color"
                  value={selectedBlock.props.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleColorChange(e, 'backgroundColor')}
                  className="sr-only"
                  id="bg-color-picker"
                />
                <label 
                  htmlFor="bg-color-picker"
                  className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                  style={{ 
                    backgroundColor: selectedBlock.props.backgroundColor || '#3b82f6',
                    borderColor: selectedBlock.props.backgroundColor === '#ffffff' ? '#e5e7eb' : 'transparent'
                  }}
                />
              </div>
              <input
                type="text"
                value={selectedBlock.props.backgroundColor || '#3b82f6'}
                onChange={(e) => handleColorChange(e, 'backgroundColor')}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Alignment */}
        {(selectedBlock.type === 'text' || selectedBlock.type === 'button') && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Alignment
            </label>
            <div className="flex p-0.5 bg-white rounded-md shadow-sm">
              <button
                onClick={() => handleAlignmentChange('left')}
                className={`flex-1 p-1.5 rounded ${
                  selectedBlock.props.textAlign === 'left' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h10M4 18h12" />
                </svg>
              </button>
              <button
                onClick={() => handleAlignmentChange('center')}
                className={`flex-1 p-1.5 rounded ${
                  selectedBlock.props.textAlign === 'center' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M7 12h10M6 18h12" />
                </svg>
              </button>
              <button
                onClick={() => handleAlignmentChange('right')}
                className={`flex-1 p-1.5 rounded ${
                  selectedBlock.props.textAlign === 'right' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M10 12h10M8 18h12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 