import React from 'react';
import { Block } from '@/types/blocks';
import { Toolbar } from '@/components/Toolbar';

interface EditorLayoutProps {
  children: React.ReactNode;
  blocks: Block[];
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ children, blocks }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="h-14 border-b bg-white px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="font-semibold text-gray-900">ModuMail</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Beta</span>
        </div>
        <Toolbar blocks={blocks} />
      </header>
      <main className="flex h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}; 