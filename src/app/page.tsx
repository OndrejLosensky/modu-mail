'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { EditorLayout } from '@/components/layout/EditorLayout';
import { PropertiesPanel } from '@/components/properties/PropertiesPanel';
import { Block } from '@/types/blocks';

// Dynamically import components that use dnd-kit
const ComponentsSidebar = dynamic(
  () => import('@/components/sidebar/ComponentsSidebar').then(mod => mod.ComponentsSidebar),
  { ssr: false }
);

const EmailCanvas = dynamic(
  () => import('@/components/canvas/EmailCanvas').then(mod => mod.EmailCanvas),
  { ssr: false }
);

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

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
  };

  const handleSelectBlock = (block: Block) => {
    setSelectedBlock(block);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <EditorLayout>
        <ComponentsSidebar />
        <EmailCanvas 
          blocks={blocks} 
          selectedBlock={selectedBlock}
          onSelectBlock={handleSelectBlock}
        />
        <PropertiesPanel selectedBlock={selectedBlock} />
      </EditorLayout>
    </DndContext>
  );
}
