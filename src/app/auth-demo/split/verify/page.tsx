import { CONFIG } from '@/config-global';
import { SplitVerifyView } from '@/sections/auth-demo/split';

// ----------------------------------------------------------------------

export const metadata = { title: `Verify | Layout split - ${CONFIG.site.name}` };

export default function Page() {
  return <SplitVerifyView />;
}
