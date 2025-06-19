import { Block } from '@/types/blocks';
import { PropertyValue } from '../components/configs/BaseComponentConfig';

export enum TemplateCategory {
  NEWSLETTER = 'newsletter',
  MARKETING = 'marketing',
  TRANSACTIONAL = 'transactional',
  ANNOUNCEMENT = 'announcement',
  CUSTOM = 'custom'
}

export interface TemplateMetadata {
  createdAt: Date;
  updatedAt: Date;
  version: string;
  author?: string;
  tags?: string[];
  category: TemplateCategory;
  previewImage?: string;
  description: string;
  stats?: {
    views: number;
    downloads: number;
    rating: number;
    ratingCount: number;
  };
}

export interface TemplateConfig {
  id: string;
  name: string;
  metadata: TemplateMetadata;
  blocks: Block[];
  variables?: Record<string, PropertyValue>;
  styles?: {
    global?: Record<string, string>;
    components?: Record<string, Record<string, string>>;
  };
}

export interface UserTemplateSharing {
  public: boolean;
  users?: string[];
  organizations?: string[];
}

export interface UserTemplate extends TemplateConfig {
  userId: string;
  organizationId?: string;
  sharing: UserTemplateSharing;
  analytics?: {
    views: number;
    downloads: number;
    rating: number;
    lastUsed?: Date;
  };
} 