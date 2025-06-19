import { blockManager } from './registry';

// Import layout blocks
import { Container, containerConfig } from './layout/container';
import { ColumnsBlock, columnsConfig } from './layout/columns';

// Import content blocks
import { TextBlock, textConfig } from './content/text';
import { DividerBlock, dividerConfig } from './content/divider';
import { ListBlock, listConfig } from './content/list';
import { SpacerBlock, spacerConfig } from './content/spacer';

// Import interactive blocks
import { ButtonBlock, buttonConfig } from './interactive/button';
import { SocialBlock, socialConfig } from './interactive/social';

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
    blockManager.registerBlock('columns', ColumnsBlock, columnsConfig);

    // Register content blocks
    blockManager.registerBlock('text', TextBlock, textConfig);
    blockManager.registerBlock('divider', DividerBlock, dividerConfig);
    blockManager.registerBlock('list', ListBlock, listConfig);
    blockManager.registerBlock('spacer', SpacerBlock, spacerConfig);

    // Register interactive blocks
    blockManager.registerBlock('button', ButtonBlock, buttonConfig);
    blockManager.registerBlock('social', SocialBlock, socialConfig);

    // Register media blocks
    blockManager.registerBlock('image', ImageBlock, imageConfig);

    blockManager.setInitialized(true);
    console.log('Blocks initialized successfully');
  } catch (error) {
    console.error('Error initializing blocks:', error);
  }
} 