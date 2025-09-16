'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'

type Template = Database['public']['Tables']['templates']['Row']

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const [template, setTemplate] = useState<Template | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [templateId, setTemplateId] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setTemplateId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!templateId) return

    const fetchTemplate = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/auth')
          return
        }

        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('id', templateId)
          .single()

        if (error) throw error
        if (!data) throw new Error('Template not found')

        setTemplate(data)
        setError(null)
      } catch (err) {
        setError('Failed to load template. Please try again later.')
        console.error('Error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [supabase, templateId, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    )
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-2 text-sm text-red-700">{error || 'Template not found'}</p>
          </div>
          <button
            onClick={() => router.push('/my-templates')}
            className="mt-4 text-sm text-blue-600 hover:text-blue-500"
          >
            ← Back to My Templates
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{template.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Last modified on {new Date(template.updated_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/my-templates')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <button
              onClick={() => router.push(`/?template=${template.id}`)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Edit Template
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-lg p-6">
          <div className="prose max-w-none">
            {/* Here you would render the actual email template preview */}
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(template.content, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 