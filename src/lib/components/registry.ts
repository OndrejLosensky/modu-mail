import { ComponentConfig, PropertyValue } from '@/types/editor';

class ComponentRegistry {
  private components: Map<string, ComponentConfig> = new Map();
  private presets: Map<string, Record<string, PropertyValue>> = new Map();
  private initialized: boolean = false;

  registerComponent(config: ComponentConfig): void {
    if (this.components.has(config.type)) {
      return;
    }
    this.components.set(config.type, config);
  }

  registerPreset(componentType: string, presetId: string, properties: Record<string, PropertyValue>): void {
    const key = `${componentType}:${presetId}`;
    if (this.presets.has(key)) {
      return;
    }
    this.presets.set(key, properties);
  }

  getComponent(type: string): ComponentConfig | undefined {
    return this.components.get(type);
  }

  getPreset(componentType: string, presetId: string): Record<string, PropertyValue> | undefined {
    return this.presets.get(`${componentType}:${presetId}`);
  }

  getAllComponents(): ComponentConfig[] {
    return Array.from(this.components.values());
  }

  getComponentsByCategory(category: string): ComponentConfig[] {
    return this.getAllComponents().filter(component => component.category === category);
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  setInitialized(value: boolean): void {
    this.initialized = value;
  }

  clear(): void {
    this.components.clear();
    this.presets.clear();
    this.initialized = false;
  }
}

export const componentRegistry = new ComponentRegistry();
export default componentRegistry; 