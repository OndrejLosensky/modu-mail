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
  // MouseSensor,
  // TouchSensor
} from '@dnd-kit/core';
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
  const [draggedItem, setDraggedItem] = useState<{
    type: BlockType;
    icon: string;
    label: string;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type = active.data.current?.type as BlockType;
    
    if (type && type in BLOCK_ICONS) {
      setDraggedItem({
        type,
        icon: BLOCK_ICONS[type],
        label: BLOCK_LABELS[type]
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'email-canvas' && active.data.current) {
      const newBlock: Block = {
        id: `${active.data.current.type}-${Date.now()}`,
        type: active.data.current.type,
        props: {}
      };

      setBlocks((prev) => [...prev, newBlock]);
    }

    setDraggedItem(null);
  };

  const handleDragCancel = () => {
    setDraggedItem(null);
  };

  const handleSelectBlock = (block: Block) => {
    setSelectedBlock(block);
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
          isDragging={!!draggedItem}
        />
        <PropertiesPanel selectedBlock={selectedBlock} />
      </EditorLayout>
      <DragOverlay draggedItem={draggedItem} />
    </DndContext>
  );
}
