import { ComponentCategory } from './ComponentCategories';

export type PropertyValue = string | number | boolean | null | PropertyValue[] | { [key: string]: PropertyValue };

export interface BaseComponentConfig {
  id: string;
  type: string;
  category: ComponentCategory;
  label: string;
  description: string;
  icon?: string;
  defaultProps: Record<string, PropertyValue>;
  validation?: {
    required?: string[];
    rules?: Record<string, (value: PropertyValue) => boolean | string>;
  };
  presets?: Record<string, Record<string, PropertyValue>>;
  preview?: {
    thumbnail?: string;
    demoProps?: Record<string, PropertyValue>;
  };
}

export interface ComponentMetadata {
  createdAt: Date;
  updatedAt: Date;
  version: string;
  author?: string;
  tags?: string[];
  isDeprecated?: boolean;
  deprecationReason?: string;
}

export interface ExtendedComponentConfig extends BaseComponentConfig {
  metadata?: ComponentMetadata;
  dependencies?: string[];
  compatibilityRules?: {
    requiredParents?: string[];
    forbiddenParents?: string[];
    maxInstances?: number;
  };
} 