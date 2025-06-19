import { componentRegistry } from '../registry';
import { textComponentConfig } from './text';
import { buttonComponentConfig } from './button';
import { imageComponentConfig } from './image';
import { dividerComponentConfig } from './divider';

console.log('Available component configs:', {
  text: textComponentConfig,
  button: buttonComponentConfig,
  image: imageComponentConfig,
  divider: dividerComponentConfig
});

// Export all component configs
export const componentConfigs = {
  text: textComponentConfig,
  button: buttonComponentConfig,
  image: imageComponentConfig,
  divider: dividerComponentConfig
};

// Register all components
Object.values(componentConfigs).forEach(config => {
  console.log('Registering component:', config.type);
  componentRegistry.registerComponent(config);
});

console.log('Registered components:', componentRegistry.getAllComponents());

export default componentConfigs; 