'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { 
  DndContext, 
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ComponentsSidebar } from '@/components/sidebar/ComponentsSidebar';
import { EmailCanvas } from '@/components/canvas/EmailCanvas';
import { DragOverlay } from '@/components/DragOverlay';
import { EditorLayout } from '@/components/layout/EditorLayout';
import { PropertiesPanel } from '@/components/properties/PropertiesPanel';
import { Block, BlockType, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, ListBlockProps, SpacerBlockProps, SocialBlockProps } from '@/types/blocks';
import { initializeBlocks } from '@/blocks/init';
import { components } from '@/config/components';
import { useBlocksStore } from '@/lib/store/blocks';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type EditableBlockProps = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | ListBlockProps | SpacerBlockProps | SocialBlockProps;

function HomeContent() {
  const [activeBlock, setActiveBlock] = useState<Block<EditableBlockProps> | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block<EditableBlockProps> | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<{ type: string; icon: string; label: string; } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { blocks, setBlocks } = useBlocksStore();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const supabase = createClient();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setIsClient(true);
    // Always initialize blocks first
    initializeBlocks();
    if (!templateId) {
      setIsLoading(false);
    }
  }, [templateId]);

  // Load template content if editing
  useEffect(() => {
    const loadTemplate = async () => {
      if (!templateId) return;

      try {
        const { data, error } = await supabase
          .from('templates')
          .select('content')
          .eq('id', templateId)
          .single();

        if (error) throw error;
        if (data) {
          console.log('Loading template content:', data.content);
          setBlocks(data.content);
        }
      } catch (error) {
        console.error('Error loading template:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (templateId) {
      loadTemplate();
    }
  }, [templateId, supabase, setBlocks]);

  const getDefaultProps = (type: BlockType): EditableBlockProps => {
    const component = components.find(c => c.type === type);
    return component ? component.defaultProps as EditableBlockProps : {} as EditableBlockProps;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type as BlockType;
    if (type) {
      const component = components.find(c => c.type === type);
      if (component) {
        setDraggedComponent({
          type: component.type,
          icon: component.icon,
          label: component.label
        });
      }
    } else {
      const activeBlock = blocks.find(block => block.id === event.active.id);
      if (activeBlock) {
        setActiveBlock(activeBlock);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    if (activeId === overId) return;

    const activeIndex = blocks.findIndex(block => block.id === activeId);
    const overIndex = blocks.findIndex(block => block.id === overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      setBlocks(arrayMove(blocks, activeIndex, overIndex));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Create the new block only when dropping
    if (over && active.data.current?.type) {
      const type = active.data.current.type as BlockType;
      const newBlock: Block<EditableBlockProps> = {
        id: `${type}-${Date.now()}`,
        type,
        props: getDefaultProps(type)
      };
      console.log('Adding new block:', newBlock);
      setBlocks([...blocks, newBlock]);
      setSelectedBlock(newBlock);
    }
    
    setActiveBlock(null);
    setDraggedComponent(null);
  };

  const handleBlockUpdate = (updatedBlock: Block<EditableBlockProps>) => {
    console.log('Updating block:', updatedBlock);
    const updatedBlocks = blocks.map((block) =>
      block.id === updatedBlock.id ? updatedBlock : block
    );
    console.log('New blocks state:', updatedBlocks);
    setBlocks(updatedBlocks);
    setSelectedBlock(updatedBlock);
  };

  const handleSelectBlock = (block: Block<EditableBlockProps> | null) => {
    setSelectedBlock(block);
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading email builder...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <EditorLayout>
        <div className="flex h-full">
          <ComponentsSidebar />
          <EmailCanvas
            blocks={blocks}
            onSelectBlock={handleSelectBlock}
            selectedBlock={selectedBlock}
            onUpdateBlock={handleBlockUpdate}
          />
          <PropertiesPanel 
            selectedBlock={selectedBlock} 
            onUpdateBlock={handleBlockUpdate}
          />
        </div>
      </EditorLayout>
      <DragOverlay 
        draggedBlock={activeBlock || undefined} 
        draggedComponent={draggedComponent || undefined}
      />
    </DndContext>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
