import { ComponentCategory } from '@/lib/components/configs/ComponentCategories';

export type PropertyType = 'text' | 'color' | 'size' | 'select' | 'number' | 'url' | 'alignment' | 'boolean' | 'sizeWithUnit' | 'sizePresets';
export enum PropertyCategory {
  Content = 'content',
  Style = 'style',
  Layout = 'layout',
  Advanced = 'advanced'
}
export type PropertyValue = string | number | boolean | null;

export interface PropertyConfig {
  key: string;
  type: PropertyType;
  label: string;
  description?: string;
  defaultValue: string | number | boolean;
  category: PropertyCategory;
  options?: Array<{
    label: string;
    value: string | number | boolean;
  }>;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: PropertyValue) => boolean;
  };
  transform?: (value: PropertyValue) => PropertyValue;
  dependencies?: Array<{
    property: string;
    value: PropertyValue;
    action: 'show' | 'hide' | 'enable' | 'disable';
  }>;
  emailClients?: {
    [client: string]: {
      supported: boolean;
      fallback?: PropertyValue;
    };
  };
}

export interface StyleConfig {
  property: string;
  value: string | number;
  important?: boolean;
  emailClients?: {
    [client: string]: {
      supported: boolean;
      fallback?: string | number;
    };
  };
  responsive?: boolean;
}

export interface ComponentConfig {
  id: string;
  type: string;
  name: string;
  description: string;
  category: ComponentCategory;
  icon: string;
  properties: PropertyConfig[];
  styles: {
    base: StyleConfig[];
    responsive?: {
      mobile?: StyleConfig[];
      tablet?: StyleConfig[];
    };
  };
  template?: {
    html: string;
    placeholders: {
      [key: string]: {
        type: string;
        defaultValue: PropertyValue;
      };
    };
  };
  presets?: Array<{
    id: string;
    name: string;
    thumbnail?: string;
    properties: Record<string, PropertyValue>;
  }>;
}

export interface EmailClientConfig {
  id: string;
  name: string;
  version?: string;
  features: {
    [feature: string]: boolean;
  };
  css: {
    properties: {
      [property: string]: {
        supported: boolean;
        fallback?: string;
      };
    };
    selectors: {
      [selector: string]: boolean;
    };
  };
}

export interface TemplateConfig {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  category: string;
  tags?: string[];
  author?: {
    id: string;
    name: string;
  };
  blocks: Array<{
    type: string;
    properties: Record<string, PropertyValue>;
  }>;
  metadata?: {
    created: string;
    modified: string;
    version: string;
    isPublic?: boolean;
    price?: number;
  };
}

// Future Supabase integration types
export interface UserTemplate extends TemplateConfig {
  userId: string;
  organizationId?: string;
  sharing: {
    public: boolean;
    users?: string[];
    organizations?: string[];
  };
  analytics?: {
    views: number;
    downloads: number;
    rating: number;
  };
} 