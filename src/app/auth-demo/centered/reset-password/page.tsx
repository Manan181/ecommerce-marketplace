import { CONFIG } from '@/config-global';
import { CenteredResetPasswordView } from '@/sections/auth-demo/centered';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return <CenteredResetPasswordView />;
}
