import React from 'react';
import { BaseComponentConfig } from '@/lib/components/configs/BaseComponentConfig';
import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';
import { BlockComponentProps } from '@/types/blocks';

interface BlockRegistry {
  [key: string]: {
    component: React.ComponentType<BlockComponentProps>;
    config: BaseComponentConfig;
  };
}

class BlockManager {
  private blocks: BlockRegistry = {};
  private initialized = false;

  registerBlock(
    id: string,
    component: React.ComponentType<BlockComponentProps>,
    config: BaseComponentConfig
  ) {
    if (this.blocks[id]) {
      console.warn(`Block with id ${id} is already registered. Skipping.`);
      return;
    }

    this.blocks[id] = {
      component,
      config,
    };
  }

  getBlock(id: string) {
    return this.blocks[id];
  }

  getBlocksByCategory(category: ComponentCategory) {
    return Object.entries(this.blocks)
      .filter(([, block]) => block.config.category === category)
      .reduce((acc, [id, block]) => {
        acc[id] = block;
        return acc;
      }, {} as BlockRegistry);
  }

  getAllBlocks() {
    return this.blocks;
  }

  isInitialized() {
    return this.initialized;
  }

  setInitialized(value: boolean) {
    this.initialized = value;
  }
}

export const blockManager = new BlockManager();

// Example of how to register blocks (will be done in a separate initialization file)
/*
import { Container, containerConfig } from './layout/container';

blockManager.registerBlock('container', Container, containerConfig);
*/ 