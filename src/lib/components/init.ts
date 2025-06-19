import { componentConfigs } from './configs';
import { componentRegistry } from './registry';

// Initialize the component registry
export function initializeComponentRegistry() {
  // If already initialized, skip
  if (componentRegistry.isInitialized()) {
    console.log('Component registry already initialized');
    return;
  }

  console.log('Initializing component registry...');
  
  // Clear any existing registrations
  componentRegistry.clear();
  
  Object.entries(componentConfigs).forEach(([type, config]) => {
    console.log(`Registering component: ${type}`);
    componentRegistry.registerComponent(config);
  });

  componentRegistry.setInitialized(true);
  console.log('Component registry initialized with components:', componentRegistry.getAllComponents());
}

// Call initialization immediately
initializeComponentRegistry(); 