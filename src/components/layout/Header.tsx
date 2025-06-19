import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 border-b bg-white px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span className="font-semibold text-gray-900">ModuMail</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Beta</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
          <span className="sr-only">Undo</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H3m0-8l-3 4m3-4l-3-4" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="sr-only">Redo</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h10m0-8l3 4m-3-4l3-4" />
          </svg>
        </button>
        <div className="h-6 w-px bg-gray-200"></div>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="sr-only">Preview</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Export HTML
        </button>
      </div>
    </header>
  );
}; 