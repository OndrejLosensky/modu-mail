import { Block } from '@/types/blocks';
import { HTMLExportOptions } from './types';
import { renderBlock } from './renderers';

const defaultContainerStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ffffff',
};

export const exportToHTML = (blocks: Block[], options: HTMLExportOptions = {}): string => {
  const {
    minify = false,
    doctype = true,
    wrapWithContainer = true,
    containerStyles = defaultContainerStyles,
  } = options;

  // Convert blocks to HTML
  let html = blocks.map(block => renderBlock(block as Block<Record<string, unknown>>)).join(minify ? '' : '\n');

  // Wrap with container if needed
  if (wrapWithContainer) {
    const containerStyleString = Object.entries(containerStyles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join(' ');

    html = `<div style="${containerStyleString}">${minify ? '' : '\n'}${html}${minify ? '' : '\n'}</div>`;
  }

  // Add email meta tags and doctype
  if (doctype) {
    const metaTags = `
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">
    `;

    html = `<!DOCTYPE html>
<html>
<head>
    ${metaTags}
</head>
<body style="margin: 0; padding: 0; width: 100%; background-color: #f3f4f6;">
    ${html}
</body>
</html>`;
  }

  // Clean up whitespace if minifying
  if (minify) {
    html = html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  return html;
};

// Helper function to download HTML
export const downloadHTML = (html: string, filename: string = 'email.html'): void => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 