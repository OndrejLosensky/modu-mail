'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlocksStore } from '@/lib/store/blocks';
import Image from 'next/image';
import { templates, EmailTemplate } from '@/lib/templates/templates';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, ListBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps } from '@/types/blocks';

type ViewMode = 'preview' | 'json' | 'html';
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
        px-4 py-2 rounded-full text-sm font-medium transition-all
        ${active 
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
      <span className="ml-2 px-2 py-0.5 rounded-full bg-white text-xs">
        {count}
      </span>
    </button>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium rounded-md transition-all
        ${active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      {children}
    </button>
  );
}

function CodeView({ code }: { code: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[500px]">
      <pre className="text-gray-300 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TemplateCard({ template, onUse }: { template: EmailTemplate; onUse: () => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const getTemplateHtml = (blocks: Block[]) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  ${blocks.map(block => {
    switch (block.type) {
      case 'text': {
        const props = block.props as TextBlockProps & { content?: string };
        const textContent = props.content || props.text;
        return `<div style="
          font-size: ${props.fontSize || '16px'};
          color: ${props.color || '#000'};
          text-align: ${props.textAlign || 'left'};
          font-weight: ${props.fontWeight || 'normal'};
          line-height: ${props.lineHeight || 'normal'};
        ">${textContent}</div>`;
      }
      case 'button': {
        const props = block.props as ButtonBlockProps;
        return `<div style="text-align: ${props.align || 'left'};">
          <a href="${props.url}" style="
            display: inline-block;
            font-size: ${props.width || '16px'};
            color: ${props.textColor || '#fff'};
            background-color: ${props.backgroundColor || '#000'};
            border-radius: ${props.borderRadius || '4px'};
            padding: 12px 24px;
            text-decoration: none;
            font-weight: 500;
            width: ${props.width === 'full' ? '100%' : 'auto'};
          ">${props.text}</a>
        </div>`;
      }
      case 'image': {
        const props = block.props as ImageBlockProps;
        return `<img src="${props.src}" alt="${props.alt || ''}" style="
          width: ${props.width || 'auto'};
          height: ${props.height || 'auto'};
          display: block;
          margin: ${props.align === 'center' ? '0 auto' : '0'};
        ">`;
      }
      case 'list': {
        const props = block.props as ListBlockProps;
        const listType = props.type === 'ordered' ? 'ol' : 'ul';
        return `<${listType} style="
          color: ${props.color || '#000'};
          font-size: ${props.fontSize || '16px'};
          line-height: ${props.lineHeight || 'normal'};
          margin: 0;
          padding-left: 1.5em;
        ">
          ${props.items.map(item => `<li>${item}</li>`).join('')}
        </${listType}>`;
      }
      case 'divider': {
        const props = block.props as DividerBlockProps;
        return `<hr style="
          border: none;
          border-top: ${props.width || '1px'} solid ${props.color || '#000'};
          margin: ${props.spacing || '20px'} 0;
        ">`;
      }
      case 'spacer': {
        const props = block.props as SpacerBlockProps;
        return `<div style="height: ${props.height || '20px'};"></div>`;
      }
      case 'social': {
        const props = block.props as SocialBlockProps;
        return `<div style="text-align: ${props.align || 'center'};">
          ${props.networks.map(network => `
            <a href="${network.url}" style="
              display: inline-block;
              margin: 0 8px;
              color: ${props.iconColor || '#000'};
              font-size: ${props.iconSize || '24px'};
              text-decoration: none;
            ">
              <img src="/icons/${network.type}.svg" alt="${network.type}" style="
                width: ${props.iconSize || '24px'};
                height: ${props.iconSize || '24px'};
              ">
            </a>
          `).join('')}
        </div>`;
      }
      default:
        return '';
    }
  }).join('\n')}
</body>
</html>`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="aspect-video relative overflow-hidden bg-gray-50">
        {viewMode === 'preview' && (
          <Image
            src={template.previewImage}
            alt={template.name}
            fill
            className="object-cover"
          />
        )}
        {viewMode === 'json' && (
          <div className="absolute inset-0 p-4 overflow-auto">
            <CodeView code={JSON.stringify(template.blocks, null, 2)} />
          </div>
        )}
        {viewMode === 'html' && (
          <div className="absolute inset-0 p-4 overflow-auto">
            <CodeView code={getTemplateHtml(template.blocks)} />
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg">
          <TabButton
            active={viewMode === 'preview'}
            onClick={() => setViewMode('preview')}
          >
            Preview
          </TabButton>
          <TabButton
            active={viewMode === 'json'}
            onClick={() => setViewMode('json')}
          >
            JSON
          </TabButton>
          <TabButton
            active={viewMode === 'html'}
            onClick={() => setViewMode('html')}
          >
            HTML
          </TabButton>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-800">
            {template.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-600">{template.description}</p>
        </div>
        <button
          onClick={onUse}
          className="shrink-0 ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors whitespace-nowrap"
        >
          Use Template
        </button>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
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
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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