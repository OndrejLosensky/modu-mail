import { StyleConfig, ComponentConfig } from '@/types/editor';
import { emailCompatibility } from './compatibility';

type PresetConfig = {
  base: StyleConfig[];
  responsive?: {
    [breakpoint: string]: StyleConfig[];
  };
};

export class StyleGenerator {
  private targetClients: string[] = ['outlook', 'gmail']; // Default supported clients

  setTargetClients(clients: string[]): void {
    this.targetClients = clients;
  }

  private generateResponsiveStyles(styles: StyleConfig[], breakpoint: string): string {
    const mediaQuery = `@media only screen and (max-width: ${breakpoint})`;
    const transformedStyles = emailCompatibility.transformStyles(styles, this.targetClients);
    
    const cssRules = transformedStyles.map(style => {
      const important = style.important ? ' !important' : '';
      return `  ${style.property}: ${style.value}${important};`;
    }).join('\n');

    return `${mediaQuery} {\n${cssRules}\n}`;
  }

  private generateBaseStyles(styles: StyleConfig[]): string {
    const transformedStyles = emailCompatibility.transformStyles(styles, this.targetClients);
    
    return transformedStyles.map(style => {
      const important = style.important ? ' !important' : '';
      return `${style.property}: ${style.value}${important};`;
    }).join('\n');
  }

  generateComponentStyles(component: ComponentConfig): string {
    const styles: string[] = [];

    // Base styles
    if (component.styles.base.length > 0) {
      styles.push(this.generateBaseStyles(component.styles.base));
    }

    // Responsive styles
    if (component.styles.responsive) {
      Object.entries(component.styles.responsive).forEach(([breakpoint, breakpointStyles]) => {
        if (breakpointStyles.length > 0) {
          styles.push(this.generateResponsiveStyles(breakpointStyles, breakpoint));
        }
      });
    }

    return styles.join('\n\n');
  }

  generateInlineStyles(styles: StyleConfig[]): string {
    const transformedStyles = emailCompatibility.transformStyles(styles, this.targetClients);
    
    return transformedStyles.map(style => {
      const important = style.important ? ' !important' : '';
      return `${style.property}: ${style.value}${important}`;
    }).join('; ');
  }

  // Common style presets
  static readonly presets: Record<string, PresetConfig> = {
    container: {
      base: [
        { property: 'max-width', value: '600px' },
        { property: 'margin', value: '0 auto' },
        { property: 'padding', value: '20px' }
      ],
      responsive: {
        '480px': [
          { property: 'padding', value: '10px' }
        ]
      }
    },
    button: {
      base: [
        { property: 'display', value: 'inline-block' },
        { property: 'padding', value: '12px 20px' },
        { property: 'text-decoration', value: 'none' },
        { property: 'border-radius', value: '4px' },
        { property: 'font-weight', value: '600' }
      ]
    },
    image: {
      base: [
        { property: 'max-width', value: '100%' },
        { property: 'height', value: 'auto' },
        { property: 'display', value: 'block' }
      ]
    },
    text: {
      base: [
        { property: 'margin', value: '0 0 16px' },
        { property: 'line-height', value: '1.5' },
        { property: 'color', value: '#333333' }
      ]
    },
    divider: {
      base: [
        { property: 'border', value: 'none' },
        { property: 'border-top', value: '1px solid #E5E7EB' },
        { property: 'margin', value: '20px 0' }
      ]
    }
  };

  // Helper method to apply presets
  applyPreset(presetName: keyof typeof StyleGenerator.presets): StyleConfig[] {
    const preset = StyleGenerator.presets[presetName];
    return [...preset.base];
  }

  // Helper method to apply preset with responsive styles
  applyPresetWithResponsive(presetName: keyof typeof StyleGenerator.presets): PresetConfig {
    const preset = StyleGenerator.presets[presetName];
    return {
      base: [...preset.base],
      responsive: preset.responsive ? { ...preset.responsive } : undefined
    };
  }
}

export const styleGenerator = new StyleGenerator();
export default styleGenerator; 