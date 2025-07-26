import { CONFIG } from '@/config-global';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export const metadata = { title: `Blank - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <Container>
      <Typography variant="h4">Blank</Typography>
    </Container>
  );
}
