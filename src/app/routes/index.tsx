import { createFileRoute } from '@tanstack/react-router'
import { getSeedPreview, getUsers } from '~/lib/api'
import { SeedPreview } from '~/components/SeedPreview'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['events'],
      queryFn: getSeedPreview
    })
    await context.queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: getUsers
    })
  },
  component: Home
})

function Home() {
  const { data: events } = useSuspenseQuery({
    queryKey: ['events'],
    queryFn: getSeedPreview
  })
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  return (
    <div className='p-8 space-y-8'>
      <h1 className='font-bold '>Welcome home!</h1>
      <SeedPreview events={events} users={users} />
    </div>
  )
}
