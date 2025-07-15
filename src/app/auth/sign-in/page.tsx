import { CONFIG } from 'src/config-global';

import { NextAuthSignInView } from 'src/sections/auth/nextauth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | NextAuth - ${CONFIG.site.name}` };

export default function Page() {
  return <NextAuthSignInView />;
}
