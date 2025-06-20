import React, { useState, useEffect } from 'react';
import { BlockComponentProps, ImageBlockProps, TextAlignment } from '@/types/blocks';

export const ImageBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onUpdate
}) => {
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // Type assertion to get the specific image props
  const props = block.props as unknown as ImageBlockProps;
  const {
    src = 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop',
    alt = 'Image description',
    width = '100%',
    height = '164px',
    borderRadius = '0',
    alignment = 'center'
  } = props;

  useEffect(() => {
    // Reset error state when src changes
    setError(false);
    
    // Handle empty or undefined src
    if (!src || src.trim() === '') {
      setImageUrl(null);
      setError(true);
      return;
    }
    
    // Handle the image URL
    try {
      // Try to create a URL object to validate the src
      new URL(src);
      setImageUrl(src);
    } catch {
      // If src is a relative path, assume it's valid
      if (src.startsWith('/')) {
        setImageUrl(src);
      } else {
        // If invalid URL and not a relative path, show placeholder
        setError(true);
        setImageUrl('https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop');
      }
    }
  }, [src]);

  const handleError = () => {
    setError(true);
    setImageUrl('https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop');
    if (onUpdate) {
      onUpdate({
        ...block,
        props: {
          ...block.props,
          src: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop',
        }
      });
    }
  };

  // Don't render anything if we don't have a valid URL
  if (!imageUrl) {
    return (
      <div
        style={{
          textAlign: alignment as TextAlignment,
          position: 'relative',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className={isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      >
        <div
          style={{
            color: '#6b7280',
            fontSize: '14px',
          }}
        >
          No image source provided
        </div>
      </div>
    );
  }

  const imageElement = (
    <img
      src={imageUrl}
      alt={alt}
      onError={handleError}
      style={{
        width,
        height,
        maxWidth: '100%',
        borderRadius: borderRadius ? `${borderRadius}px` : '0',
        display: 'block',
        margin: '0 auto',
      }}
      className="transition-all duration-200"
    />
  );

  const linkUrl = (props.link || '') as string;

  return (
    <div
      className={`p-4 ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      style={{
        textAlign: alignment as TextAlignment,
      }}
    >
      {linkUrl.trim() ? (
        <a 
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          {imageElement}
        </a>
      ) : imageElement}
      {error && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
}; 