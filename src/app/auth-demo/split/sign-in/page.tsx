import { CONFIG } from '@/config-global';
import { SplitSignInView } from '@/sections/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Layout split - ${CONFIG.site.name}` };

export default function Page() {
  return <SplitSignInView />;
}
