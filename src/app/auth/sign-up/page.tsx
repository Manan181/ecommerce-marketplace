import { CONFIG } from 'src/config-global';

import { NextAuthSignUpView } from 'src/sections/auth/nextauth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | NextAuth - ${CONFIG.site.name}` };

export default function Page() {
  return <NextAuthSignUpView />;
}
