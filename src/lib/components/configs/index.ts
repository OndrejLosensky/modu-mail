import { componentRegistry } from '../registry';
import { textConfig } from './text';
import { buttonConfig } from './button';
import { imageConfig } from './image';
import { dividerConfig } from './divider';
import { spacerConfig } from './spacer';
import { socialConfig } from './social';
import { listConfig } from './list';

console.log('Available component configs:', {
  text: textConfig,
  button: buttonConfig,
  image: imageConfig,
  divider: dividerConfig,
  spacer: spacerConfig,
  social: socialConfig,
  list: listConfig
});

// Export all component configs
export const componentConfigs = {
  text: textConfig,
  button: buttonConfig,
  image: imageConfig,
  divider: dividerConfig,
  spacer: spacerConfig,
  social: socialConfig,
  list: listConfig
} as const;

// Register all components
export const registerComponents = () => {
  Object.values(componentConfigs).forEach(config => {
    componentRegistry.registerComponent(config);
  });
};

console.log('Registered components:', componentRegistry.getAllComponents());

export default componentConfigs; 