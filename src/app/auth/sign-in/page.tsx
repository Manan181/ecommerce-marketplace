import { CONFIG } from '@/config-global';
import { NextAuthSignInView } from '@/sections/auth/nextauth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | NextAuth - ${CONFIG.site.name}` };

export default function Page() {
  return <NextAuthSignInView />;
}
