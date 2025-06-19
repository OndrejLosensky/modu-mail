import React from 'react';

interface EditorLayoutProps {
  children: React.ReactNode;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className="flex-1 bg-gray-100">
      <main className="h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}; 