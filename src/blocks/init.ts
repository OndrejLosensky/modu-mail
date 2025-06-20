import { blockManager } from './registry';

// Import layout blocks
import { Container, containerConfig } from './layout/container';

// Import content blocks
import { TextBlock, textConfig } from './content/text';
import { DividerBlock, dividerConfig } from './content/divider';
import { ListBlock, listConfig } from './content/list';
import { SpacerBlock, spacerConfig } from './layout/spacer';

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
    console.log('Registering layout blocks...');
    blockManager.registerBlock('container', Container, containerConfig);

    // Register content blocks
    console.log('Registering content blocks...');
    blockManager.registerBlock('text', TextBlock, textConfig);
    blockManager.registerBlock('divider', DividerBlock, dividerConfig);
    blockManager.registerBlock('list', ListBlock, listConfig);
    blockManager.registerBlock('spacer', SpacerBlock, spacerConfig);

    // Register interactive blocks
    console.log('Registering interactive blocks...');
    blockManager.registerBlock('button', ButtonBlock, buttonConfig);
    blockManager.registerBlock('social', SocialBlock, socialConfig);

    // Register media blocks
    console.log('Registering media blocks...');
    blockManager.registerBlock('image', ImageBlock, imageConfig);

    blockManager.setInitialized(true);
    console.log('Blocks initialized successfully');
    console.log('Registered blocks:', blockManager.getAllBlocks());
  } catch (error) {
    console.error('Error initializing blocks:', error);
  }
} 