import { create } from 'zustand';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps, ListBlockProps } from '@/types/blocks';
import { v4 as uuidv4 } from 'uuid';

type BlockProps = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | SpacerBlockProps | SocialBlockProps | ListBlockProps;

interface BlocksStore {
  blocks: Block<BlockProps>[];
  setBlocks: (blocks: Block<BlockProps>[]) => void;
  deleteBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => string | null;
}

export const useBlocksStore = create<BlocksStore>((set, get) => ({
  blocks: [],
  setBlocks: (blocks) => {
    console.log('Setting blocks in store:', blocks);
    
    if (!blocks || blocks.length === 0) {
      console.log('Warning: Attempting to set empty blocks array');
    }
    
    // Migrate any text blocks that use content to text
    const migratedBlocks = blocks.map(block => {
      if (block.type === 'text') {
        const props = block.props as TextBlockProps & { content?: string };
        if (props.content) {
          return {
            ...block,
            props: {
              ...props,
              text: props.content,
              content: undefined
            }
          };
        }
      }
      return block;
    });
    
    console.log('Setting migrated blocks:', migratedBlocks);
    set({ blocks: migratedBlocks });
    
    // Log the current state after update
    const currentState = get().blocks;
    console.log('Current blocks state after update:', currentState);
  },
  deleteBlock: (blockId) => {
    console.log('Deleting block:', blockId);
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== blockId)
    }));
  },
  duplicateBlock: (blockId) => {
    let newBlockId: string | null = null;
    
    set((state) => {
      const blockToDuplicate = state.blocks.find((block) => block.id === blockId);
      if (!blockToDuplicate) {
        console.log('Block to duplicate not found:', blockId);
        return state;
      }

      newBlockId = uuidv4();
      const duplicatedBlock = {
        ...blockToDuplicate,
        id: newBlockId,
        isDuplicate: true, // Add flag to identify duplicates
      };

      return {
        blocks: [...state.blocks, duplicatedBlock]
      };
    });
    
    return newBlockId;
  }
})); 