import { ComponentConfig, PropertyConfig, StyleConfig } from '@/types/editor';
import { BlockHTMLConfig } from '@/lib/export/html/types';
import { ComponentCategory } from './configs/ComponentCategories';

export class ComponentBuilder<T = Record<string, unknown>> {
  private config: ComponentConfig = {
    id: '',
    type: '',
    name: '',
    description: '',
    category: ComponentCategory.Content,
    icon: '',
    properties: [],
    styles: {
      base: [],
    },
  };
  private htmlConfig: Partial<BlockHTMLConfig> = {};
  private styleConfigs: StyleConfig[] = [];

  constructor(id: string) {
    this.config.id = id;
    this.config.type = id;
  }

  setName(name: string): ComponentBuilder<T> {
    this.config.name = name;
    return this;
  }

  setDescription(description: string): ComponentBuilder<T> {
    this.config.description = description;
    return this;
  }

  setCategory(category: ComponentCategory): ComponentBuilder<T> {
    this.config.category = category;
    return this;
  }

  setIcon(icon: string): ComponentBuilder<T> {
    this.config.icon = icon;
    return this;
  }

  addProperty(property: PropertyConfig): ComponentBuilder<T> {
    this.config.properties.push(property);
    return this;
  }

  addStyle(style: StyleConfig): ComponentBuilder<T> {
    this.styleConfigs.push(style);
    return this;
  }

  setHtmlTag(tag: string): ComponentBuilder<T> {
    this.htmlConfig.tag = tag;
    return this;
  }

  setAttributeGenerator(generator: BlockHTMLConfig['attributeGenerator']): ComponentBuilder<T> {
    this.htmlConfig.attributeGenerator = generator;
    return this;
  }

  setInnerContentGenerator(generator: BlockHTMLConfig['innerContentGenerator']): ComponentBuilder<T> {
    this.htmlConfig.innerContentGenerator = generator;
    return this;
  }

  build(): { component: ComponentConfig; html: BlockHTMLConfig } {
    if (!this.config.name) {
      throw new Error('Component name is required');
    }

    const component: ComponentConfig = {
      ...this.config,
      styles: {
        base: this.styleConfigs,
      }
    };

    const html: BlockHTMLConfig = {
      ...this.htmlConfig,
      tag: this.htmlConfig.tag || 'div',
      styleGenerator: () => {
        const styles: Record<string, string> = {};
        this.styleConfigs.forEach(style => {
          styles[style.property] = style.value.toString();
        });
        return styles;
      }
    };

    return { component, html };
  }
} 