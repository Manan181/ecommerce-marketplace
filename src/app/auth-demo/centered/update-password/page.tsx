import { CONFIG } from '@/config-global';
import { CenteredUpdatePasswordView } from '@/sections/auth-demo/centered';

// ----------------------------------------------------------------------

export const metadata = { title: `Update password | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return <CenteredUpdatePasswordView />;
}
