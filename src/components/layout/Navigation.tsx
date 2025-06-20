'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { exportToHTML } from '@/lib/export/html';
import { useBlocksStore } from '@/lib/store/blocks';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { SaveTemplateDialog } from '../SaveTemplateDialog';
import { Database } from '@/types/supabase';

interface NavigationProps {
  onNewTemplate?: () => void;
}

function NavigationContent({ onNewTemplate }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Database['public']['Tables']['templates']['Row'] | null>(null);
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { blocks } = useBlocksStore();

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

  // Fetch current template if editing
  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) {
        setCurrentTemplate(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('id', templateId)
          .single();

        if (error) throw error;
        setCurrentTemplate(data);
      } catch (error) {
        console.error('Error fetching template:', error);
        router.push('/');
      }
    };

    fetchTemplate();
  }, [templateId, supabase, router]);

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

  const handleSaveClick = () => {
    setIsSaveDialogOpen(true);
  };

  const handleSaveTemplate = async (name: string, description: string) => {
    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      setIsSaving(true);
      
      console.log('Current blocks before save:', blocks);
      
      // First, check if we can access the templates table
      const { error: checkError } = await supabase
        .from('templates')
        .select('count')
        .limit(1);
        
      if (checkError) {
        console.error('Error checking templates table:', checkError);
        throw checkError;
      }

      if (currentTemplate) {
        // Update existing template
        console.log('Updating template with blocks:', blocks);
        const { error } = await supabase
          .from('templates')
          .update({
            name,
            description,
            content: blocks,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentTemplate.id);

        if (error) throw error;
      } else {
        // Create new template
        console.log('Creating new template with blocks:', blocks);
        const { error } = await supabase
          .from('templates')
          .insert({
            name,
            description,
            content: blocks,
            is_public: false,
            user_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      }

      router.push('/my-templates');
    } catch (error) {
      console.error('Error saving template:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSaving(false);
      setIsSaveDialogOpen(false);
    }
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

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
                onClick={handleSaveClick}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>{currentTemplate ? 'Update' : 'Save'}</span>
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

      <SaveTemplateDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveTemplate}
        isLoading={isSaving}
        defaultName={currentTemplate?.name || ''}
        defaultDescription={currentTemplate?.description || ''}
      />
    </>
  );
}

export const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <Suspense fallback={
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
      </nav>
    }>
      <NavigationContent {...props} />
    </Suspense>
  );
};