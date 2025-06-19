import { Block } from '@/types/blocks';
import { blockConfigs } from '@/config/blocks/renderers';

const styleObjectToString = (styles: Record<string, string | number>): string => {
  return Object.entries(styles)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(' ');
};

export const renderBlock = (block: Block): string => {
  const config = blockConfigs[block.type];
  if (!config) {
    console.warn(`No renderer found for block type: ${block.type}`);
    return '';
  }

  const { tag, styleGenerator, attributeGenerator, innerContentGenerator } = config;
  const styles = styleGenerator(block);
  const attributes = attributeGenerator?.(block) || {};

  // Build HTML attributes string
  const attributesString = Object.entries({
    ...attributes,
    style: styleObjectToString(styles),
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  // For self-closing tags (like img, hr)
  if (!innerContentGenerator) {
    return `<${tag} ${attributesString} />`;
  }

  // For tags with content
  const content = innerContentGenerator(block);
  return `<${tag} ${attributesString}>${content}</${tag}>`;
}; 