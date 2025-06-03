import { supabase } from '~/utils/supabase'

export async function getSeedPreview() {
  const { data, error } = await supabase.from('events').select(`
    id, title, starts_at, ends_at,
    organisations:organisations!events_organisation_id_fkey(name),
    groups:groups!events_group_id_fkey(name),
    users:users!events_created_by_fkey(first_name, last_name),
    speaker:users!events_speaker_id_fkey(first_name, last_name)
  `)
  if (error) throw error
  return data
}

export async function getUsers() {
  const { data, error } = await supabase.from('users').select(`
    id, first_name, last_name, email
  `)
  if (error) throw error
  return data
}
