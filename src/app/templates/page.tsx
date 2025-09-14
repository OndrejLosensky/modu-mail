'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useBlocksStore } from '@/lib/store/blocks';
import { templates, EmailTemplate } from '@/lib/templates/templates';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, ListBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps } from '@/types/blocks';

type Category = 'all' | 'newsletter' | 'marketing' | 'transactional' | 'announcement';

function CategoryButton({ category, active, count, onClick }: { 
  category: Category; 
  active: boolean; 
  count: number;
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border-2
        ${active 
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }
      `}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
      <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium ${
        active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
      }`}>
        {count}
      </span>
    </button>
  );
}

function TemplateCard({ template, onUse }: { template: EmailTemplate; onUse: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Email Preview Render */}
        <div className="absolute inset-0 p-4 bg-white">
          <div className="w-full h-full overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="p-4 h-full overflow-y-auto">
              <div className="space-y-3">
                {template.blocks.slice(0, 4).map((block, index) => {
                  switch (block.type) {
                    case 'text': {
                      const props = block.props as TextBlockProps & { content?: string };
                      const textContent = props.content || props.text;
                      return (
                        <div
                          key={block.id}
                          className="text-sm leading-relaxed"
                          style={{
                            color: props.color || '#374151',
                            textAlign: props.textAlign || 'left',
                            fontWeight: props.fontWeight || 'normal',
                          }}
                        >
                          {textContent}
                        </div>
                      );
                    }
                    case 'button': {
                      const props = block.props as ButtonBlockProps;
                      return (
                        <div
                          key={block.id}
                          className="flex"
                          style={{
                            justifyContent: props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
                          }}
                        >
                          <div
                            className="px-4 py-2 text-sm font-medium rounded-md"
                            style={{
                              color: props.textColor || '#fff',
                              backgroundColor: props.backgroundColor || '#3b82f6',
                              borderRadius: `${props.borderRadius || 6}px`,
                            }}
                          >
                            {props.text}
                          </div>
                        </div>
                      );
                    }
                    case 'image': {
                      const props = block.props as ImageBlockProps;
                      return (
                        <div
                          key={block.id}
                          className="flex"
                          style={{
                            justifyContent: props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
                          }}
                        >
                          <div
                            className="bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-xs"
                            style={{
                              width: props.width === 'full' ? '100%' : '120px',
                              height: '60px',
                            }}
                          >
                            📧 Image
                          </div>
                        </div>
                      );
                    }
                    case 'divider': {
                      const props = block.props as DividerBlockProps;
                      return (
                        <hr
                          key={block.id}
                          className="border-0"
                          style={{
                            borderTop: `${props.width || 1}px solid ${props.color || '#e5e7eb'}`,
                            margin: `${props.spacing || 16}px 0`,
                          }}
                        />
                      );
                    }
                    case 'spacer': {
                      const props = block.props as SpacerBlockProps;
                      return (
                        <div
                          key={block.id}
                          style={{
                            height: `${props.height || 16}px`,
                          }}
                        />
                      );
                    }
                    default:
                      return null;
                  }
                })}
                {template.blocks.length > 4 && (
                  <div className="text-xs text-gray-400 text-center py-2">
                    +{template.blocks.length - 4} more blocks
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/95 backdrop-blur-sm text-gray-800 shadow-sm">
            {template.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
        </div>
        
        <button
          onClick={onUse}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Use Template
        </button>
      </div>
    </div>
  );
}

function TemplatesPageContent() {
  const router = useRouter();
  const setBlocks = useBlocksStore((state) => state.setBlocks);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const handleUseTemplate = (template: EmailTemplate) => {
    // Migrate any blocks that use content to text
    const migratedBlocks = template.blocks.map(block => {
      if (block.type === 'text') {
        const props = block.props as TextBlockProps & { content?: string };
        if (props.content && !props.text) {
          return {
            ...block,
            props: {
              ...props,
              text: props.content,
              content: undefined
            }
          };
        }
      }
      return block;
    });
    
    setBlocks(migratedBlocks);
    router.push('/');
  };

  const filteredTemplates = templates.filter(
    template => selectedCategory === 'all' || template.category === selectedCategory
  );

  const categoryCount = {
    all: templates.length,
    newsletter: templates.filter(t => t.category === 'newsletter').length,
    marketing: templates.filter(t => t.category === 'marketing').length,
    transactional: templates.filter(t => t.category === 'transactional').length,
    announcement: templates.filter(t => t.category === 'announcement').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Email Templates</h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Choose from our collection of professionally designed email templates to get started quickly
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 px-4">
            {(['all', 'newsletter', 'marketing', 'transactional', 'announcement'] as const).map((category) => (
              <CategoryButton
                key={category}
                category={category}
                active={selectedCategory === category}
                count={categoryCount[category]}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={() => handleUseTemplate(template)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            
            {/* Category filters skeleton */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-lg w-24"></div>
                ))}
              </div>
            </div>
            
            {/* Template cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <TemplatesPageContent />
    </Suspense>
  );
} 