import React, { useState } from 'react';
import { BlockComponentProps, ImageBlockProps } from '@/types/blocks';

export const ImageBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onUpdate
}) => {
  const [error, setError] = useState(false);
  
  // Type assertion to get the specific image props
  const props = block.props as ImageBlockProps;
  const {
    src = 'https://via.placeholder.com/600x400',
    alt = 'Image description',
    width = '100%',
    height = 'auto',
    objectFit = 'cover',
    borderRadius = '0px',
    align = 'center'
  } = props;

  const handleError = () => {
    setError(true);
    if (onUpdate) {
      onUpdate({
        ...block,
        props: {
          ...block.props,
          src: 'https://via.placeholder.com/600x400?text=Image+Error',
        }
      });
    }
  };

  return (
    <div
      style={{
        textAlign: align
      }}
      className={`
        p-4
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
    >
      <img
        src={error ? 'https://via.placeholder.com/600x400?text=Image+Error' : src}
        alt={alt}
        onError={handleError}
        style={{
          width,
          height,
          objectFit,
          borderRadius,
          display: 'inline-block',
          maxWidth: '100%',
        }}
        className="transition-all duration-200"
      />
    </div>
  );
}; 