import createSupabaseServerClient from './supabase/server';

export default async function getUserAuth() {
  const supabase = createSupabaseServerClient();
  return supabase.auth.getUser()
}