import { format } from 'date-fns'

export function SeedPreview({ events, users, attending }: { events: any[]; users: any[]; attending: any[] }) {
  return (
    <div className='space-y-8'>
      <table className='min-w-full border'>
        <thead>
          <tr className='bg-gray-100 text-gray-600'>
            <th className='border px-2'>ID</th>
            <th className='border px-2'>First name</th>
            <th className='border px-2'>Last name</th>
            <th className='border px-2'>email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user.id}>
              <td className='border px-2'>{user.id}</td>
              <td className='border px-2'>{user.first_name}</td>
              <td className='border px-2'>{user.last_name}</td>
              <td className='border px-2'>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='min-w-full border'>
        <thead>
          <tr className='bg-gray-100 text-gray-600'>
            <th className='border px-2'>Title</th>
            <th className='border px-2'>Org</th>
            <th className='border px-2'>Group</th>
            <th className='border px-2'>Created By</th>
            <th className='border px-2'>Speaker</th>
            <th className='border px-2'>Starts</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event: any) => (
            <tr key={event.id}>
              <td className='border px-2'>{event.title}</td>
              <td className='border px-2'>{event.organisations?.name}</td>
              <td className='border px-2'>{event.groups?.name}</td>
              <td className='border px-2'>
                {event.users
                  ? `${event.users.first_name ?? '[No first name]'} ${event.users.last_name ?? '[No last name]'}`
                  : '[No user]'}
              </td>
              <td className='border px-2'>
                {event.speaker
                  ? `${event.speaker.first_name ?? '[No first name]'} ${
                      event.speaker.last_name ?? '[No last name]'
                    }`
                  : '[No speaker]'}
              </td>
              <td className='border px-2'>{format(new Date(event.starts_at), 'dd MMMM yyyy HH:mm')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='min-w-full border'>
        <thead>
          <tr className='bg-gray-100 text-gray-600'>
            <th className='border px-2'>Title</th>
            <th className='border px-2'>Name</th>
            <th className='border px-2'>Attending</th>
          </tr>
        </thead>
        <tbody>
          {attending?.map((attendee: any) => (
            <tr key={attendee.user_id}>
              <td className='border px-2'>{attendee.event.title}</td>
              <td className='border px-2'>{attendee.user.first_name + ' ' + attendee.user.last_name}</td>
              <td className='border px-2 capitalize'>{attendee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
