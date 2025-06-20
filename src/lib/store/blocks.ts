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

export const useBlocksStore = create<BlocksStore>((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
  deleteBlock: (blockId) => set((state) => ({
    blocks: state.blocks.filter((block) => block.id !== blockId)
  })),
  duplicateBlock: (blockId) => {
    let newBlockId: string | null = null;
    
    set((state) => {
      const blockToDuplicate = state.blocks.find((block) => block.id === blockId);
      if (!blockToDuplicate) return state;

      newBlockId = uuidv4();
      const duplicatedBlock = {
        ...blockToDuplicate,
        id: newBlockId,
        isDuplicate: true, // Add flag to identify duplicates
      };

      const blockIndex = state.blocks.findIndex((block) => block.id === blockId);
      const newBlocks = [...state.blocks];
      newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);

      return { blocks: newBlocks };
    });

    return newBlockId;
  },
})); 