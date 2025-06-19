import { blockManager } from './registry';

// Import layout blocks
import { Container, containerConfig } from './layout/container';

// Import content blocks
import { TextBlock, textConfig } from './content/text';
import { DividerBlock, dividerConfig } from './content/divider';

// Import interactive blocks
import { ButtonBlock, buttonConfig } from './interactive/button';

// Import media blocks
import { ImageBlock, imageConfig } from './media/image';

// Register all blocks
export function initializeBlocks() {
  if (blockManager.isInitialized()) {
    console.log('Blocks already initialized');
    return;
  }

  console.log('Initializing blocks...');

  try {
    // Register layout blocks
    blockManager.registerBlock('container', Container, containerConfig);

    // Register content blocks
    blockManager.registerBlock('text', TextBlock, textConfig);
    blockManager.registerBlock('divider', DividerBlock, dividerConfig);

    // Register interactive blocks
    blockManager.registerBlock('button', ButtonBlock, buttonConfig);

    // Register media blocks
    blockManager.registerBlock('image', ImageBlock, imageConfig);

    blockManager.setInitialized(true);
    console.log('Blocks initialized successfully');
  } catch (error) {
    console.error('Error initializing blocks:', error);
  }
} 