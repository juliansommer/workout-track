import createSupabaseServerClient from './supabase/server';

export default async function getUserSession() {
  const supabase = createSupabaseServerClient();
  return supabase.auth.getSession();
}
