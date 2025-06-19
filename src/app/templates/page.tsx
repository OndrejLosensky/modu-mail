'use client';

import React from 'react';
import { templates } from '@/config/templates';
import { renderBlock } from '@/lib/export/html/renderers';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = React.useState(templates[0]);

  const renderPreview = () => {
    if (!selectedTemplate) return null;

    const htmlContent = selectedTemplate.blocks
      .map(block => renderBlock(block))
      .join('\n');

    return (
      <div 
        className="bg-white rounded-lg shadow-sm p-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Templates List */}
      <div className="col-span-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`w-full px-4 py-4 text-left transition-colors ${
                selectedTemplate?.id === template.id
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span className="capitalize">{template.category}</span>
                <span className="mx-2">•</span>
                <span>{template.blocks.length} blocks</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Preview */}
      <div className="col-span-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4 pb-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">{selectedTemplate?.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{selectedTemplate?.description}</p>
          </div>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
} 