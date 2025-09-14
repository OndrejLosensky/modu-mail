'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase'
import { Block, TextBlockProps, ButtonBlockProps, ImageBlockProps, DividerBlockProps, SpacerBlockProps } from '@/types/blocks'
import { Dialog, Transition } from '@headlessui/react'

type Template = Database['public']['Tables']['templates']['Row']

export default function MyTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingTemplates, setDeletingTemplates] = useState<Set<string>>(new Set())
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null)
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

  const openDeleteModal = (templateId: string) => {
    setTemplateToDelete(templateId)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setTemplateToDelete(null)
    setDeleteModalOpen(false)
  }

  const handleDelete = async () => {
    if (!templateToDelete) return

    setDeletingTemplates(prev => new Set([...prev, templateToDelete]))
    setError(null)
    closeDeleteModal()

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateToDelete)

      if (error) throw error

      setTemplates(prev => prev.filter(t => t.id !== templateToDelete))
    } catch (err) {
      console.error('Error deleting template:', err)
      setError('Failed to delete template. Please try again.')
    } finally {
      setDeletingTemplates(prev => {
        const newSet = new Set(prev)
        newSet.delete(templateToDelete)
        return newSet
      })
      setTemplateToDelete(null)
    }
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">My Templates</h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto mb-6">
              Manage and organize your saved email templates
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {/* Email Preview Render */}
                    <div className="absolute inset-0 p-4 bg-white">
                      <div className="w-full h-full overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm">
                        <div className="p-4 h-full overflow-y-auto">
                          <div className="space-y-3">
                            {(template.content as Block[])?.slice(0, 4).map((block, index) => {
                              switch (block.type) {
                                case 'text': {
                                  const props = block.props as TextBlockProps & { content?: string };
                                  const textContent = props.content || props.text;
                                  return (
                                    <div
                                      key={block.id}
                                      className="text-sm leading-relaxed"
                                      style={{
                                        color: props.color || '#374151',
                                        textAlign: props.textAlign || 'left',
                                        fontWeight: props.fontWeight || 'normal',
                                      }}
                                    >
                                      {textContent}
                                    </div>
                                  );
                                }
                                case 'button': {
                                  const props = block.props as ButtonBlockProps;
                                  return (
                                    <div
                                      key={block.id}
                                      className="flex"
                                      style={{
                                        justifyContent: props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
                                      }}
                                    >
                                      <div
                                        className="px-4 py-2 text-sm font-medium rounded-md"
                                        style={{
                                          color: props.textColor || '#fff',
                                          backgroundColor: props.backgroundColor || '#3b82f6',
                                          borderRadius: `${props.borderRadius || 6}px`,
                                        }}
                                      >
                                        {props.text}
                                      </div>
                                    </div>
                                  );
                                }
                                case 'image': {
                                  const props = block.props as ImageBlockProps;
                                  return (
                                    <div
                                      key={block.id}
                                      className="flex"
                                      style={{
                                        justifyContent: props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
                                      }}
                                    >
                                      <div
                                        className="bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-xs"
                                        style={{
                                          width: props.width === 'full' ? '100%' : '120px',
                                          height: '60px',
                                        }}
                                      >
                                        📧 Image
                                      </div>
                                    </div>
                                  );
                                }
                                case 'divider': {
                                  const props = block.props as DividerBlockProps;
                                  return (
                                    <hr
                                      key={block.id}
                                      className="border-0"
                                      style={{
                                        borderTop: `${props.width || 1}px solid ${props.color || '#e5e7eb'}`,
                                        margin: `${props.spacing || 16}px 0`,
                                      }}
                                    />
                                  );
                                }
                                case 'spacer': {
                                  const props = block.props as SpacerBlockProps;
                                  return (
                                    <div
                                      key={block.id}
                                      style={{
                                        height: `${props.height || 16}px`,
                                      }}
                                    />
                                  );
                                }
                                default:
                                  return null;
                              }
                            })}
                            {(template.content as Block[])?.length > 4 && (
                              <div className="text-xs text-gray-400 text-center py-2">
                                +{(template.content as Block[]).length - 4} more blocks
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <div className="absolute bottom-2 left-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/95 backdrop-blur-sm shadow-sm ${
                        template.is_public ? 'text-green-700' : 'text-gray-800'
                      }`}>
                        {template.is_public ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Last modified {new Date(template.updated_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {template.description || 'No description provided'}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDeleteModal(template.id)}
                        disabled={deletingTemplates.has(template.id)}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          deletingTemplates.has(template.id)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        }`}
                      >
                        {deletingTemplates.has(template.id) ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          'Delete'
                        )}
                      </button>
                      <Link
                        href={`/?template=${template.id}`}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg text-center"
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

      <Transition appear show={deleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Template
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this template? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete Template
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
} 