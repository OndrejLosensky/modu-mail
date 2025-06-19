'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  DndContext, 
  DragEndEvent, 
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { EditorLayout } from '@/components/layout/EditorLayout';
import { PropertiesPanel } from '@/components/properties/PropertiesPanel';
import { DragOverlay } from '@/components/DragOverlay';
import { Block, BlockType } from '@/types/blocks';

// Dynamically import components that use dnd-kit
const ComponentsSidebar = dynamic(
  () => import('@/components/sidebar/ComponentsSidebar').then(mod => mod.ComponentsSidebar),
  { ssr: false }
);

const EmailCanvas = dynamic(
  () => import('@/components/canvas/EmailCanvas').then(mod => mod.EmailCanvas),
  { ssr: false }
);

const BLOCK_ICONS: Record<BlockType, string> = {
  text: 'T',
  image: '🖼',
  button: '↗',
  divider: '—'
};

const BLOCK_LABELS: Record<BlockType, string> = {
  text: 'Text Block',
  image: 'Image',
  button: 'Button',
  divider: 'Divider'
};

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<{
    type: BlockType;
    icon: string;
    label: string;
  } | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    // Handle new component drag
    if (active.data.current?.type && !blocks.find(b => b.id === active.id)) {
      const type = active.data.current.type as BlockType;
      setDraggedComponent({
        type,
        icon: BLOCK_ICONS[type],
        label: BLOCK_LABELS[type]
      });
      return;
    }

    // Handle block reordering
    const draggedBlock = blocks.find(block => block.id === active.id);
    if (draggedBlock) {
      setDraggedBlock(draggedBlock);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Handle new component drop
    if (over && over.id === 'email-canvas' && draggedComponent) {
      const type = draggedComponent.type;
      const newBlock: Block = {
        id: `${type}-${Date.now()}`,
        type,
        props: getDefaultProps(type)
      };

      setBlocks((prev) => [...prev, newBlock]);
      setSelectedBlock(newBlock);
    }
    // Handle block reordering
    else if (over && draggedBlock) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);

      if (oldIndex !== newIndex) {
        setBlocks(blocks => arrayMove(blocks, oldIndex, newIndex));
      }
    }

    setDraggedComponent(null);
    setDraggedBlock(null);
  };

  const handleDragCancel = () => {
    setDraggedComponent(null);
    setDraggedBlock(null);
  };

  const handleSelectBlock = (block: Block) => {
    setSelectedBlock(block);
  };

  const handleUpdateBlock = (updatedBlock: Block) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ));
    setSelectedBlock(updatedBlock);
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <EditorLayout>
        <ComponentsSidebar />
        <EmailCanvas 
          blocks={blocks} 
          selectedBlock={selectedBlock}
          onSelectBlock={handleSelectBlock}
          onUpdateBlock={handleUpdateBlock}
          isDragging={!!draggedComponent || !!draggedBlock}
        />
        <PropertiesPanel selectedBlock={selectedBlock} />
      </EditorLayout>
      <DragOverlay 
        draggedBlock={draggedBlock || undefined}
        draggedComponent={draggedComponent || undefined}
      />
    </DndContext>
  );
}

function getDefaultProps(type: BlockType) {
  switch (type) {
    case 'text':
      return { text: 'New text block' };
    case 'button':
      return { text: 'Get Started', href: '#' };
    case 'image':
      return { src: '', alt: '' };
    case 'divider':
      return {};
    default:
      return {};
  }
}
