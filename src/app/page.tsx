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
import { components } from '@/config/components';
import { useBlocksStore } from '@/lib/store/blocks';

export default function Home() {
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<{ type: string; icon: string; label: string; } | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { blocks, setBlocks } = useBlocksStore();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setIsClient(true);
    initializeBlocks();
  }, []);

  const getDefaultProps = (type: BlockType) => {
    const component = components.find(c => c.type === type);
    return component ? component.defaultProps : {};
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
      const newBlock: Block = {
        id: `${type}-${Date.now()}`,
        type,
        props: getDefaultProps(type)
      };
      setBlocks([...blocks, newBlock]);
      setSelectedBlock(newBlock);
    }
    
    setActiveBlock(null);
    setDraggedComponent(null);
  };

  const handleBlockUpdate = (updatedBlock: Block) => {
    setBlocks(
      blocks.map((block) =>
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
