import { componentRegistry } from '../registry';
import { textConfig } from './text';
import { buttonConfig } from './button';
import { imageConfig } from './image';
import { dividerConfig } from './divider';
import { spacerConfig } from './spacer';
import { socialConfig } from './social';
import { columnsConfig } from './columns';

console.log('Available component configs:', {
  text: textConfig,
  button: buttonConfig,
  image: imageConfig,
  divider: dividerConfig,
  spacer: spacerConfig,
  social: socialConfig,
  columns: columnsConfig
});

// Export all component configs
export const componentConfigs = {
  text: textConfig,
  button: buttonConfig,
  image: imageConfig,
  divider: dividerConfig,
  spacer: spacerConfig,
  social: socialConfig,
  columns: columnsConfig,
} as const;

// Register all components
export const registerComponents = () => {
  Object.values(componentConfigs).forEach(config => {
    componentRegistry.registerComponent(config);
  });
};

console.log('Registered components:', componentRegistry.getAllComponents());

export default componentConfigs; 