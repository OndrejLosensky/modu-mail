'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function AuthPage() {
  const supabase = createClient()
  const [redirectUrl, setRedirectUrl] = useState<string>('')

  useEffect(() => {
    setRedirectUrl(`${window.location.origin}/auth/callback`)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to ModuMail
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to start creating amazing email templates
          </p>
        </div>
        {redirectUrl && (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['github', 'google']}
            redirectTo={redirectUrl}
            theme="light"
          />
        )}
      </div>
    </div>
  )
} 