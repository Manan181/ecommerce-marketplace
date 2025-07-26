import { CONFIG } from '@/config-global';
import { SplitResetPasswordView } from '@/sections/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | Layout split - ${CONFIG.site.name}` };

export default function Page() {
  return <SplitResetPasswordView />;
}
