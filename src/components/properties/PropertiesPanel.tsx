import React from 'react';
import { Block, ButtonBlockProps, TextBlockProps, ImageBlockProps, DividerBlockProps, ListBlockProps } from '@/types/blocks';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdateBlock?: (block: Block) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedBlock,
  onUpdateBlock = () => {}
}) => {
  if (!selectedBlock) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedBlock.type === 'text' || selectedBlock.type === 'button') {
      onUpdateBlock({
        ...selectedBlock,
        props: {
          ...selectedBlock.props,
          text: e.target.value
        }
      });
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBlock.type === 'button') {
      onUpdateBlock({
        ...selectedBlock,
        props: {
          ...selectedBlock.props,
          href: e.target.value
        }
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBlock.type === 'image') {
      onUpdateBlock({
        ...selectedBlock,
        props: {
          ...selectedBlock.props,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  return (
    <div className="w-72 border-l bg-white overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-900 uppercase">
          {selectedBlock.type.toUpperCase()}
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {selectedBlock.type === 'text' && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Text Content
            </label>
            <textarea
              value={(selectedBlock.props as TextBlockProps).text || ''}
              onChange={handleTextChange}
              rows={3}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              placeholder="Enter text..."
            />
          </div>
        )}

        {selectedBlock.type === 'list' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                List Type
              </label>
              <select
                value={(selectedBlock.props as ListBlockProps).listType}
                onChange={(e) => onUpdateBlock({
                  ...selectedBlock,
                  props: {
                    ...selectedBlock.props,
                    listType: e.target.value as 'ordered' | 'unordered'
                  }
                })}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              >
                <option value="unordered">Bulleted</option>
                <option value="ordered">Numbered</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Font Size
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={(selectedBlock.props as ListBlockProps).fontSize?.replace('px', '') || '16'}
                  onChange={(e) => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      fontSize: `${e.target.value}px`
                    }
                  })}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Text Color
              </label>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <input
                    type="color"
                    value={(selectedBlock.props as ListBlockProps).color || '#1f2937'}
                    onChange={(e) => onUpdateBlock({
                      ...selectedBlock,
                      props: {
                        ...selectedBlock.props,
                        color: e.target.value
                      }
                    })}
                    className="sr-only"
                    id="list-text-color-picker"
                  />
                  <label 
                    htmlFor="list-text-color-picker"
                    className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                    style={{ 
                      backgroundColor: (selectedBlock.props as ListBlockProps).color || '#1f2937',
                      borderColor: (selectedBlock.props as ListBlockProps).color === '#ffffff' ? '#e5e7eb' : 'transparent'
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={(selectedBlock.props as ListBlockProps).color || '#1f2937'}
                  onChange={(e) => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      color: e.target.value
                    }
                  })}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
              </div>
            </div>

            {(selectedBlock.props as ListBlockProps).listType === 'unordered' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-700">
                  Bullet Color
                </label>
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <input
                      type="color"
                      value={(selectedBlock.props as ListBlockProps).bulletColor || '#1f2937'}
                      onChange={(e) => onUpdateBlock({
                        ...selectedBlock,
                        props: {
                          ...selectedBlock.props,
                          bulletColor: e.target.value
                        }
                      })}
                      className="sr-only"
                      id="bullet-color-picker"
                    />
                    <label 
                      htmlFor="bullet-color-picker"
                      className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                      style={{ 
                        backgroundColor: (selectedBlock.props as ListBlockProps).bulletColor || '#1f2937',
                        borderColor: (selectedBlock.props as ListBlockProps).bulletColor === '#ffffff' ? '#e5e7eb' : 'transparent'
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={(selectedBlock.props as ListBlockProps).bulletColor || '#1f2937'}
                    onChange={(e) => onUpdateBlock({
                      ...selectedBlock,
                      props: {
                        ...selectedBlock.props,
                        bulletColor: e.target.value
                      }
                    })}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Spacing
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={(selectedBlock.props as ListBlockProps).spacing?.replace('em', '') || '0.5'}
                  onChange={(e) => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      spacing: `${e.target.value}em`
                    }
                  })}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                <span className="text-xs text-gray-500">em</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Alignment
              </label>
              <div className="flex p-0.5 bg-white rounded-md shadow-sm">
                <button
                  onClick={() => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      textAlign: 'left'
                    }
                  })}
                  className={`flex-1 p-1.5 rounded ${
                    (selectedBlock.props as ListBlockProps).textAlign === 'left' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h10M4 18h12" />
                  </svg>
                </button>
                <button
                  onClick={() => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      textAlign: 'center'
                    }
                  })}
                  className={`flex-1 p-1.5 rounded ${
                    (selectedBlock.props as ListBlockProps).textAlign === 'center' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M7 12h10M6 18h12" />
                  </svg>
                </button>
                <button
                  onClick={() => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      textAlign: 'right'
                    }
                  })}
                  className={`flex-1 p-1.5 rounded ${
                    (selectedBlock.props as ListBlockProps).textAlign === 'right' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M10 12h10M8 18h12" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {selectedBlock.type === 'image' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="src"
                value={(selectedBlock.props as ImageBlockProps).src || ''}
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
                value={(selectedBlock.props as ImageBlockProps).alt || ''}
                onChange={handleImageChange}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                placeholder="Image description"
              />
            </div>
          </>
        )}

        {selectedBlock.type === 'button' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Button Text
              </label>
              <textarea
                value={(selectedBlock.props as ButtonBlockProps).text || ''}
                onChange={handleTextChange}
                rows={1}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                placeholder="Get Started"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Link URL
              </label>
              <input
                type="url"
                value={(selectedBlock.props as ButtonBlockProps).href || ''}
                onChange={handleLinkChange}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                placeholder="https://example.com"
              />
            </div>
          </>
        )}

        {selectedBlock.type === 'divider' && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Height
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={(selectedBlock.props as DividerBlockProps).height?.replace('px', '') || '1'}
                  onChange={(e) => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      height: `${e.target.value}px`
                    }
                  })}
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
                    value={(selectedBlock.props as DividerBlockProps).color || '#e5e7eb'}
                    onChange={(e) => onUpdateBlock({
                      ...selectedBlock,
                      props: {
                        ...selectedBlock.props,
                        color: e.target.value
                      }
                    })}
                    className="sr-only"
                    id="divider-color-picker"
                  />
                  <label 
                    htmlFor="divider-color-picker"
                    className="block w-7 h-7 rounded-md border border-gray-200 cursor-pointer overflow-hidden shadow-sm"
                    style={{ 
                      backgroundColor: (selectedBlock.props as DividerBlockProps).color || '#e5e7eb',
                      borderColor: (selectedBlock.props as DividerBlockProps).color === '#ffffff' ? '#e5e7eb' : 'transparent'
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={(selectedBlock.props as DividerBlockProps).color || '#e5e7eb'}
                  onChange={(e) => onUpdateBlock({
                    ...selectedBlock,
                    props: {
                      ...selectedBlock.props,
                      color: e.target.value
                    }
                  })}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm text-gray-900 uppercase placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 