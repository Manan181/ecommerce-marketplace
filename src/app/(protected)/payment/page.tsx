import { CONFIG } from '@/config-global';
import { PaymentView } from '@/sections/payment/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Payment - ${CONFIG.site.name}` };

export default function Page() {
  return <PaymentView />;
}
