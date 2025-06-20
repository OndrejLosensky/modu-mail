'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Block } from '@/types/blocks';
import { exportToHTML } from '@/lib/export/html';
import { useBlocksStore } from '@/lib/store/blocks';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface NavigationProps {
  blocks: Block[];
  onNewTemplate?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ blocks, onNewTemplate }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

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

  const handleSaveTemplate = async () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      setIsSaving(true);
      
      // First, check if we can access the templates table
      const { error: checkError } = await supabase
        .from('templates')
        .select('count')
        .limit(1);
        
      if (checkError) {
        console.error('Error checking templates table:', checkError);
        throw checkError;
      }

      // Then try to insert the template
      const { data, error } = await supabase
        .from('templates')
        .insert({
          name: 'Untitled Template',
          description: '',
          content: blocks,
          is_public: false,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting template:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned after insert');
      }

      console.log('Template saved successfully:', data);
      router.push('/my-templates');
    } catch (error) {
      console.error('Error saving template. Full error:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
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
            Template Gallery
          </Link>
          {user && (
            <Link
              href="/my-templates"
              className={`text-sm font-medium ${
                pathname === '/my-templates' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Templates
            </Link>
          )}
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

          {user && (
            <button
              onClick={handleSaveTemplate}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          )}

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

      {user && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {user.email?.[0].toUpperCase()}
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export const NavigationWrapper: React.FC = () => {
  const { blocks } = useBlocksStore();
  return <Navigation blocks={blocks} />;
};