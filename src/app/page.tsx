'use client';

import React, { useState, useEffect } from 'react';
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
import { Block, BlockType } from '@/types/blocks';
import { initializeBlocks } from '@/blocks/init';

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<{ type: string; icon: string; label: string; } | null>(null);
  const [isClient, setIsClient] = useState(false);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setIsClient(true);
    initializeBlocks();
  }, []);

  const getDefaultProps = (type: BlockType) => {
    switch (type) {
      case 'text':
        return {
          text: 'New text block',
          fontSize: '16px',
          color: '#1f2937',
          textAlign: 'left'
        };
      case 'image':
        return {
          src: 'https://via.placeholder.com/600x400',
          alt: 'Image description',
          width: '100%',
          height: 'auto'
        };
      case 'button':
        return {
          text: 'Click me',
          href: '#',
          fontSize: '16px',
          color: '#ffffff',
          backgroundColor: '#3b82f6',
          align: 'left'
        };
      case 'divider':
        return {
          color: '#e5e7eb',
          height: '1px',
          borderStyle: 'solid'
        };
      case 'container':
        return {
          maxWidth: '600px',
          padding: '20px',
          backgroundColor: '#ffffff',
          align: 'center'
        };
      default:
        return {};
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type as BlockType;
    if (type) {
      // Only set the draggedComponent info, don't create a block yet
      const componentInfo = {
        text: { icon: 'T', label: 'Text Block' },
        image: { icon: '🖼', label: 'Image' },
        button: { icon: '↗', label: 'Button' },
        divider: { icon: '—', label: 'Divider' },
        list: { icon: '•', label: 'List' }
      }[type as 'text' | 'image' | 'button' | 'divider' | 'list'];
      
      if (componentInfo) {
        setDraggedComponent({ type, ...componentInfo });
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
      setBlocks(blocks => arrayMove(blocks, activeIndex, overIndex));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Create the new block only when dropping
    if (over && active.data.current?.type) {
      const type = active.data.current.type as BlockType;
      const newBlock: Block = {
        id: `${type}-${Date.now()}`,
        type,
        props: getDefaultProps(type)
      };
      setBlocks((prev) => [...prev, newBlock]);
      setSelectedBlock(newBlock);
    }
    
    setActiveBlock(null);
    setDraggedComponent(null);
  };

  const handleBlockUpdate = (updatedBlock: Block) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block
      )
    );
    setSelectedBlock(updatedBlock);
  };

  const handleSelectBlock = (block: Block) => {
    setSelectedBlock(block);
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading email builder...</p>
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
      <EditorLayout blocks={blocks}>
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
      </EditorLayout>
      <DragOverlay 
        draggedBlock={activeBlock || undefined} 
        draggedComponent={draggedComponent || undefined}
      />
    </DndContext>
  );
}
