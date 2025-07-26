import { CONFIG } from '@/config-global';
import { CenteredSignUpView } from '@/sections/auth-demo/centered';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return <CenteredSignUpView />;
}
