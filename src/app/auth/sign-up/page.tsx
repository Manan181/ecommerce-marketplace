import { CONFIG } from '@/config-global';
import { NextAuthSignUpView } from '@/sections/auth/nextauth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | NextAuth - ${CONFIG.site.name}` };

export default function Page() {
  return <NextAuthSignUpView />;
}
