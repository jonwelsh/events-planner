import { createFileRoute } from '@tanstack/react-router'
import { getSeedPreview, getUsers, getAttending } from '~/lib/api'
import { SeedPreview } from '~/components/SeedPreview'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  // This loader function will run on the server when the route is accessed
  // and will ensure that the data is available before rendering the component.
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['events'],
      queryFn: getSeedPreview
    })
    await context.queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: getUsers
    })
    await context.queryClient.ensureQueryData({
      queryKey: ['attending'],
      queryFn: getAttending
    })
  },
  component: Home
})

function Home() {
  // Use the useSuspenseQuery hook to fetch data
  const { data: events } = useSuspenseQuery({
    queryKey: ['events'],
    queryFn: getSeedPreview
  })
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  const { data: attending } = useSuspenseQuery({
    queryKey: ['attending'],
    queryFn: getAttending
  })

  console.log(attending)
  return (
    <div className='p-8 space-y-8'>
      <h1 className='font-bold '>Welcome home!</h1>
      <SeedPreview events={events} users={users} attending={attending} />
    </div>
  )
}
