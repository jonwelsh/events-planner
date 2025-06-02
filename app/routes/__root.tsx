// app/routes/__root.tsx
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import appCss from '../styles/app.css?url'
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '~/utils/supabase'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = await getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  const res = await fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/', {
    headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY! }
  })
  console.log('Supabase status:', res.status)

  if (!data.user?.email) {
    return null
  }

  return {
    email: data.user.email
  }
})
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { rel: 'stylesheet', href: appCss },
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'TanStack Start Starter'
      }
    ]
  }),
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user
    }
  },
  component: RootComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position='bottom-right' />
        <Scripts />
      </body>
    </html>
  )
}
