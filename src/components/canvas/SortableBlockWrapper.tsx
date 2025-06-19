import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableBlockWrapperProps {
  id: string;
  children: React.ReactNode;
}

export const SortableBlockWrapper: React.FC<SortableBlockWrapperProps> = ({ id, children }) => {
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
    transition,
    opacity: isDragging ? 0.5 : undefined,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="group relative">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded border bg-white text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" {...listeners}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13Z" fill="currentColor" />
            <path d="M9 17C9.55228 17 10 16.5523 10 16C10 15.4477 9.55228 15 9 15C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17Z" fill="currentColor" />
            <path d="M9 9C9.55228 9 10 8.55228 10 8C10 7.44772 9.55228 7 9 7C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9Z" fill="currentColor" />
            <path d="M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z" fill="currentColor" />
            <path d="M15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17Z" fill="currentColor" />
            <path d="M15 9C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7C14.4477 7 14 7.44772 14 8C14 8.55228 14.4477 9 15 9Z" fill="currentColor" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}; 