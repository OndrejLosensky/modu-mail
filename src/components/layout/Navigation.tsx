'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Block } from '@/types/blocks';
import { exportToHTML } from '@/lib/export/html';
import { useBlocksStore } from '@/lib/store/blocks';

interface NavigationProps {
  blocks: Block[];
  onNewTemplate?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ blocks, onNewTemplate }) => {
  const pathname = usePathname();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleExportHTML = () => {
    const html = exportToHTML(blocks);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <nav className="h-14 border-b bg-white px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="font-semibold text-gray-900">ModuMail</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Beta</span>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className={`text-sm font-medium ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Editor
            </Link>
            <Link 
              href="/templates"
              className={`text-sm font-medium ${
                pathname === '/templates' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Templates
            </Link>
          </div>
        </div>

        {pathname === '/' && (
          <div className="flex items-center gap-3">
            <button
              onClick={onNewTemplate}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m-8-8h16" />
              </svg>
              <span>New</span>
            </button>

            <button
              onClick={handleExportHTML}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>HTML</span>
            </button>

            <button
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Preview</span>
            </button>
          </div>
        )}
      </nav>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-100 rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-medium text-gray-900">Preview</h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <iframe
                srcDoc={exportToHTML(blocks)}
                className="w-full h-full min-h-[600px] bg-white rounded-lg shadow"
                title="Email Preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const NavigationWrapper: React.FC = () => {
  const { blocks } = useBlocksStore();
  return <Navigation blocks={blocks} />;
}; 