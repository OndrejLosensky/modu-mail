'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'
import { BlockRenderer } from '@/blocks/BlockRenderer'
import { Block } from '@/types/blocks'

type Template = Database['public']['Tables']['templates']['Row']
type ViewMode = 'preview' | 'json' | 'html'

export default function MyTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewModes, setViewModes] = useState<Record<string, ViewMode>>({})
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          window.location.href = '/auth'
          return
        }

        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })

        if (error) throw error

        const initialViewModes = data?.reduce((acc, template) => ({
          ...acc,
          [template.id]: 'preview' as ViewMode
        }), {})
        setViewModes(initialViewModes || {})
        setTemplates(data || [])
        setError(null)
      } catch (err) {
        setError('Failed to load templates. Please try again later.')
        console.error('Error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [supabase])

  const handleDelete = async (templateId: string) => {
    if (!window.confirm('Are you sure you want to delete this template?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId)

      if (error) throw error

      setTemplates(templates.filter(t => t.id !== templateId))
    } catch (err) {
      console.error('Error deleting template:', err)
      alert('Failed to delete template. Please try again.')
    }
  }

  const renderContent = (template: Template, viewMode: ViewMode) => {
    switch (viewMode) {
      case 'preview':
        return (
          <div className="absolute inset-0 transform scale-[0.35] origin-top-left">
            {(template.content as Block[])?.map((block, index) => (
              <BlockRenderer
                key={block.id}
                block={block}
                isSelected={false}
                onClick={() => {}}
                onUpdate={() => {}}
                isPreview={true}
              />
            ))}
          </div>
        )
      case 'json':
        return (
          <pre className="text-xs text-gray-600 overflow-auto h-full p-4 bg-gray-50 rounded-lg font-mono">
            {JSON.stringify(template.content, null, 2)}
          </pre>
        )
      case 'html':
        return (
          <div className="text-xs text-gray-600 h-full p-4 bg-gray-50 rounded-lg font-mono">
            HTML view coming soon...
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Create Template
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          </div>
        ) : error ? (
          <div className="mt-8 rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        ) : templates.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No saved templates</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first template</p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Create Template
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center gap-1 p-1 bg-gray-50 border-b border-gray-100">
                  {(['preview', 'json', 'html'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewModes(prev => ({ ...prev, [template.id]: mode }))}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        viewModes[template.id] === mode
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Last modified {new Date(template.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      template.is_public
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {template.is_public ? 'Public' : 'Private'}
                    </span>
                  </div>
                  
                  <div className="h-[300px] relative bg-gray-50 rounded-xl overflow-hidden">
                    {renderContent(template, viewModes[template.id])}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {template.description || 'No description provided'}
                    </p>
                    <Link
                      href={`/?template=${template.id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 