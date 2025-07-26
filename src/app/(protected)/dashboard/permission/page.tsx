import { CONFIG } from '@/config-global';
import { PermissionDeniedView } from '@/sections/permission/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Permission | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <PermissionDeniedView />;
}
