import { Block } from '@/types/blocks';

export type StyleGenerator<T> = (block: Block<T>) => Record<string, string | number>; 