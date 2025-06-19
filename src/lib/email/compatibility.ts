import { EmailClientConfig, StyleConfig } from '@/types/editor';

class EmailClientCompatibility {
  private clients: Map<string, EmailClientConfig> = new Map();

  registerClient(config: EmailClientConfig): void {
    if (this.clients.has(config.id)) {
      throw new Error(`Email client ${config.id} is already registered`);
    }
    this.clients.set(config.id, config);
  }

  isStyleSupported(clientId: string, property: string): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;
    return client.css.properties[property]?.supported ?? false;
  }

  getStyleFallback(clientId: string, property: string): string | undefined {
    const client = this.clients.get(clientId);
    if (!client) return undefined;
    return client.css.properties[property]?.fallback;
  }

  isSelectorSupported(clientId: string, selector: string): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;
    return client.css.selectors[selector] ?? false;
  }

  isFeatureSupported(clientId: string, feature: string): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;
    return client.features[feature] ?? false;
  }

  transformStyles(styles: StyleConfig[], targetClients: string[]): StyleConfig[] {
    const transformedStyles: StyleConfig[] = [];

    for (const style of styles) {
      const unsupportedClients = targetClients.filter(
        clientId => !this.isStyleSupported(clientId, style.property)
      );

      if (unsupportedClients.length === 0) {
        // Style is supported by all target clients
        transformedStyles.push(style);
        continue;
      }

      // Add the original style
      transformedStyles.push(style);

      // Add fallbacks for unsupported clients
      for (const clientId of unsupportedClients) {
        const fallback = this.getStyleFallback(clientId, style.property);
        if (fallback) {
          transformedStyles.push({
            property: style.property,
            value: fallback,
            important: true,
            emailClients: {
              [clientId]: {
                supported: true,
                fallback: undefined
              }
            }
          });
        }
      }
    }

    return transformedStyles;
  }
}

export const emailCompatibility = new EmailClientCompatibility();
export default emailCompatibility;

// Register common email clients
emailCompatibility.registerClient({
  id: 'outlook',
  name: 'Microsoft Outlook',
  version: '2019+',
  features: {
    flexbox: false,
    grid: false,
    webfonts: true,
  },
  css: {
    properties: {
      'display': {
        supported: true,
        fallback: 'block'
      },
      'max-width': {
        supported: true
      },
      'border-radius': {
        supported: true
      },
      'background': {
        supported: true,
        fallback: 'bgcolor'
      }
    },
    selectors: {
      ':hover': false,
      '@media': true
    }
  }
});

emailCompatibility.registerClient({
  id: 'gmail',
  name: 'Gmail',
  version: 'modern',
  features: {
    flexbox: true,
    grid: false,
    webfonts: true,
  },
  css: {
    properties: {
      'display': {
        supported: true
      },
      'max-width': {
        supported: true
      },
      'border-radius': {
        supported: true
      },
      'background': {
        supported: true
      }
    },
    selectors: {
      ':hover': true,
      '@media': true
    }
  }
}); 