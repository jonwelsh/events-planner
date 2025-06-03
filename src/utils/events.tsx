import { queryOptions } from '@tanstack/react-query'
import { getAttending, getSeedPreview, getUsers } from '~/lib/api'

export const eventQueryOptions = () =>
  queryOptions({
    queryKey: ['events'],
    queryFn: getSeedPreview
  })

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: getUsers
  })

export const attendingQueryOptions = () =>
  queryOptions({
    queryKey: ['attending'],
    queryFn: getAttending
  })
