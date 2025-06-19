import { create } from 'zustand';
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, SpacerBlockProps, SocialBlockProps, ListBlockProps } from '@/types/blocks';

type BlockProps = TextBlockProps | ButtonBlockProps | ImageBlockProps | DividerBlockProps | SpacerBlockProps | SocialBlockProps | ListBlockProps;

interface BlocksStore {
  blocks: Block<BlockProps>[];
  setBlocks: (blocks: Block<BlockProps>[]) => void;
}

export const useBlocksStore = create<BlocksStore>((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
})); 