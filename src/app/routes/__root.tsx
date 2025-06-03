// app/routes/__root.tsx
import type { ReactNode } from 'react'
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
// import { createServerFn } from '@tanstack/react-start'

import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// import { getSupabaseServerClient } from '~/utils/supabase'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'

import '~/styles/app.css'

// const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
//   const supabase = await getSupabaseServerClient()
//   const { data, error: _error } = await supabase.auth.getUser()

//   const res = await fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/', {
//     headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY! }
//   })
//   console.log('Supabase status:', res.status)

//   if (!data.user?.email) {
//     return null
//   }

//   return {
//     email: data.user.email
//   }
// })

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
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
    ],
    links: []
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
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
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools position='bottom-left' />
        <Scripts />
      </body>
    </html>
  )
}
