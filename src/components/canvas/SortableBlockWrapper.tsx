import React, { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableBlockWrapperProps {
  id: string;
  children: React.ReactNode;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  isDuplicate?: boolean;
  isNew?: boolean;
  isSelected?: boolean;
}

export const SortableBlockWrapper: React.FC<SortableBlockWrapperProps> = ({ 
  id, 
  children, 
  onDelete,
  onDuplicate,
  isDuplicate,
  isNew,
  isSelected
}) => {
  const [showNewAnimation, setShowNewAnimation] = useState(isNew);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isNew) {
      // Reset animation after it plays
      const timer = setTimeout(() => {
        setShowNewAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: [
      transition,
      showNewAnimation ? 'background-color 0.3s ease-in-out' : null
    ].filter(Boolean).join(', '),
    opacity: isDragging ? 0.5 : undefined,
    position: 'relative' as const,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes}
      className={`
        relative
        ${showNewAnimation ? 'animate-slide-in bg-blue-50' : ''}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      <div className="group relative">
        {isDuplicate && (
          <div 
            className="absolute -right-2 -top-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3H4C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V4C17 3.44772 16.5523 3 16 3Z" fill="currentColor"/>
              <path d="M17 7H20C20.5523 7 21 7.44772 21 8V20C21 20.5523 20.5523 21 20 21H8C7.44772 21 7 20.5523 7 20V17" fill="currentColor"/>
            </svg>
            {showTooltip && (
              <div className="absolute top-5 right-0 w-48 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-50 pointer-events-none">
                <div className="absolute -top-1 right-1.5 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                This is a duplicated block. Any changes made to it won&apos;t affect the original.
              </div>
            )}
          </div>
        )}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onDelete?.(id)}
            className="flex items-center justify-center w-6 h-6 rounded border bg-white text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:border-red-500"
            title="Delete block"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDuplicate?.(id)}
            className="flex items-center justify-center w-6 h-6 rounded border bg-white text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500 hover:border-blue-500"
            title="Duplicate block"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3H4C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V4C17 3.44772 16.5523 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 7H20C20.5523 7 21 7.44772 21 8V20C21 20.5523 20.5523 21 20 21H8C7.44772 21 7 20.5523 7 20V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div 
            className="flex items-center justify-center w-6 h-6 rounded border bg-white text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" 
            {...listeners}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13Z" fill="currentColor" />
              <path d="M9 17C9.55228 17 10 16.5523 10 16C10 15.4477 9.55228 15 9 15C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17Z" fill="currentColor" />
              <path d="M9 9C9.55228 9 10 8.55228 10 8C10 7.44772 9.55228 7 9 7C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9Z" fill="currentColor" />
              <path d="M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z" fill="currentColor" />
              <path d="M15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17Z" fill="currentColor" />
              <path d="M15 9C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7C14.4477 7 14 7.44772 14 8C14 8.55228 14.4477 9 15 9Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}; 