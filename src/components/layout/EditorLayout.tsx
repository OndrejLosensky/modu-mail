import React from 'react';

interface EditorLayoutProps {
  children: React.ReactNode;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="h-14 border-b bg-white px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="font-semibold text-gray-900">ModuMail</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Beta</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 text-gray-700 font-medium">New</button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 text-gray-700 font-medium">HTML</button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 text-gray-700 font-medium">JSON</button>
          <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Preview</button>
        </div>
      </header>
      <main className="flex h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}; 