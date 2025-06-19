import { create } from 'zustand';
import { Block } from '@/types/blocks';

interface BlocksStore {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}

export const useBlocksStore = create<BlocksStore>()((set) => ({
  blocks: [],
  setBlocks: (blocks: Block[]) => set({ blocks }),
})); 