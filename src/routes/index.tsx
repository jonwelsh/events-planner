import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

import { SeedPreview } from 'src/components/SeedPreview'
import { attendingQueryOptions, eventQueryOptions, usersQueryOptions } from '~/utils/events'

import { NotFound } from '~/components/NotFound'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(eventQueryOptions()),
      await context.queryClient.ensureQueryData(usersQueryOptions()),
      await context.queryClient.ensureQueryData(attendingQueryOptions())
  },
  errorComponent: UserErrorComponent,
  component: Home,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>
  }
})

export function UserErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function Home() {
  const events = useSuspenseQuery(eventQueryOptions())
  const user = useSuspenseQuery(usersQueryOptions())
  const attending = useSuspenseQuery(attendingQueryOptions())

  return (
    <div className='p-2'>
      <h3>Welcome Home!!!</h3>
      <SeedPreview events={events.data} users={user.data} attending={attending.data} />
    </div>
  )
}
