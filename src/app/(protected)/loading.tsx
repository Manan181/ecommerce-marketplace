import { LoadingScreen } from '@/components/loading-screen';

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingScreen />
    </div>
  );
}
