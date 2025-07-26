import { CONFIG } from '@/config-global';
import { CenteredVerifyView } from '@/sections/auth-demo/centered';

// ----------------------------------------------------------------------

export const metadata = { title: `Verify | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return <CenteredVerifyView />;
}
