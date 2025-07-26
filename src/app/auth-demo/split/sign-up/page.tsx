import { CONFIG } from '@/config-global';
import { SplitSignUpView } from '@/sections/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Layout split - ${CONFIG.site.name}` };

export default function Page() {
  return <SplitSignUpView />;
}
