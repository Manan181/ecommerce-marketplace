import { GuestGuard } from '@/auth/guard';
import { AuthSplitLayout } from '@/layouts/auth-split';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>{children}</AuthSplitLayout>
    </GuestGuard>
  );
}
