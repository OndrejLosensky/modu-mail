import { Block } from '@/types/blocks';

export interface HTMLExportOptions {
  minify?: boolean;
  doctype?: boolean;
  wrapWithContainer?: boolean;
  containerStyles?: {
    maxWidth?: string;
    margin?: string;
    padding?: string;
    backgroundColor?: string;
  };
}

export interface BlockRenderer {
  (block: Block): string;
}

export interface StyleGenerator {
  (block: Block): Record<string, string | number>;
}

export interface BlockHTMLConfig {
  tag: string;
  styleGenerator: StyleGenerator;
  attributeGenerator?: (block: Block) => Record<string, string>;
  innerContentGenerator?: (block: Block) => string;
} 