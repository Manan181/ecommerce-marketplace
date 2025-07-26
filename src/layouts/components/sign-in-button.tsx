import type { ButtonProps } from '@mui/material/Button';

import { CONFIG } from '@/config-global';
import { RouterLink } from '@/routes/components';

import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Button
      component={RouterLink}
      href={CONFIG.auth.redirectPath}
      variant="outlined"
      sx={sx}
      {...other}
    >
      Sign in
    </Button>
  );
}
