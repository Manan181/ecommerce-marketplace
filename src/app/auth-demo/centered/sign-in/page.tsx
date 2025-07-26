import { CONFIG } from '@/config-global';
import { CenteredSignInView } from '@/sections/auth-demo/centered';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return <CenteredSignInView />;
}
