import { supabase } from '~/utils/supabase'

export async function getSeedPreview() {
  const { data, error } = await supabase.from('events').select(`id, title, starts_at, ends_at,
    organisations:organisations!events_organisation_id_fkey(name),
    groups:groups!events_group_id_fkey(name),
    users:users!events_created_by_fkey(first_name, last_name),
    speaker:users!events_speaker_id_fkey(first_name, last_name)`)
  if (error) throw error
  return data
}

export async function getUsers() {
  const { data, error } = await supabase.from('users').select(`id, first_name, last_name, email`).limit(5) // Limit to 3 for preview purposes
  if (error) throw error
  return data
}

export async function getAttending() {
  const { data, error } = await supabase
    .from('event_attendance')
    .select(
      `event_id, user_id, status,user:event_attendance_user_id_fkey(first_name, last_name),event:event_attendance_event_id_fkey(title)`
    )
  if (error) throw error
  return data
}
