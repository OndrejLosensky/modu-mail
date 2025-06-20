import { create } from 'zustand';
import { Block } from '@/types/blocks';
import { v4 as uuidv4 } from 'uuid';
import { useBlocksStore } from './blocks';

interface GroupsStore {
  selectedBlocks: string[];
  setSelectedBlocks: (blockIds: string[]) => void;
  addToSelection: (blockId: string) => void;
  removeFromSelection: (blockId: string) => void;
  clearSelection: () => void;
  createGroup: () => void;
  ungroup: (groupId: string) => void;
}

export const useGroupsStore = create<GroupsStore>((set, get) => ({
  selectedBlocks: [],
  
  setSelectedBlocks: (blockIds) => set({ selectedBlocks: blockIds }),
  
  addToSelection: (blockId) => set((state) => ({
    selectedBlocks: [...state.selectedBlocks, blockId]
  })),
  
  removeFromSelection: (blockId) => set((state) => ({
    selectedBlocks: state.selectedBlocks.filter(id => id !== blockId)
  })),
  
  clearSelection: () => set({ selectedBlocks: [] }),
  
  createGroup: () => {
    const { selectedBlocks } = get();
    if (selectedBlocks.length < 2) return; // Need at least 2 blocks to create a group

    const blocks = useBlocksStore.getState().blocks;
    const selectedBlocksData = blocks.filter(block => selectedBlocks.includes(block.id));
    
    // Find the position of the first selected block
    const firstSelectedIndex = blocks.findIndex(block => block.id === selectedBlocks[0]);
    
    const groupId = uuidv4();
    const groupBlock: Block = {
      id: groupId,
      type: 'group',
      props: {
        name: `Group ${groupId.slice(0, 4)}`,
        blocks: selectedBlocksData,
        padding: '16px',
        backgroundColor: 'transparent',
        borderRadius: '4px'
      }
    };

    // Update the blocks store
    const newBlocks = [...blocks];
    // Remove all selected blocks
    const filteredBlocks = newBlocks.filter(block => !selectedBlocks.includes(block.id));
    // Insert the group block at the position of the first selected block
    filteredBlocks.splice(firstSelectedIndex, 0, groupBlock);
    
    useBlocksStore.setState({ blocks: filteredBlocks });
    set({ selectedBlocks: [] }); // Clear selection after grouping
  },

  ungroup: (groupId) => {
    const blocks = useBlocksStore.getState().blocks;
    const groupBlockIndex = blocks.findIndex(block => block.id === groupId);
    
    if (groupBlockIndex === -1) return;
    
    const groupBlock = blocks[groupBlockIndex];
    if (groupBlock.type !== 'group') return;
    
    const groupedBlocks = groupBlock.props.blocks as Block[];
    
    // Update the blocks store
    const newBlocks = [...blocks];
    // Remove the group block
    newBlocks.splice(groupBlockIndex, 1);
    // Insert the ungrouped blocks at the same position
    newBlocks.splice(groupBlockIndex, 0, ...groupedBlocks);
    
    useBlocksStore.setState({ blocks: newBlocks });
  }
})); 