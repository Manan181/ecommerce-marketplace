import { CONFIG } from '@/config-global';
import { OverviewAppView } from '@/sections/overview/app/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <OverviewAppView />;
}
