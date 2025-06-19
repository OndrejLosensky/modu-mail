import { Block } from '@/types/blocks';

export interface HTMLExportOptions {
  minify?: boolean;
  doctype?: boolean;
  wrapWithContainer?: boolean;
  containerStyles?: Record<string, string>;
}

export type StyleGenerator<T = Record<string, unknown>> = (block: Block<T>) => Record<string, string | number>;

export interface BlockHTMLConfig {
  tag: string;
  styleGenerator?: StyleGenerator<Record<string, unknown>>;
  attributeGenerator?: (block: Block<Record<string, unknown>>) => Record<string, string | Record<string, string>>;
  innerContentGenerator?: (block: Block<Record<string, unknown>>) => string;
} 