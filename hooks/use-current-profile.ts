import { getCurrentProfile } from '@/lib/profiles/actions';
import { redirect } from 'next/navigation';

export async function useCurrentProfile() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect('/sign-in');
  }

  return profile;
}
