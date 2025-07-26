import type { IconButtonProps } from '@mui/material/IconButton';

import { paths } from '@/routes/paths';
import { Label } from '@/components/label';
import { useRouter, usePathname } from '@/routes/hooks';
import { usePopover, CustomPopover } from '@/components/custom-popover';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover({ data = [], sx, ...other }: AccountPopoverProps) {
  const router = useRouter();

  const popover = usePopover();

  const pathname = usePathname();

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <AccountButton
        open={popover.open}
        onClick={popover.onOpen}
        photoURL=""
        displayName="Manan"
        sx={sx}
        {...other}
      />

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{
          paper: { sx: { p: 0, width: 200 } },
          arrow: { offset: 20 },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            Manan
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            manan@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList sx={{ p: 1, my: 1 }}>
          {data.map((option) => {
            const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';

            const rootHref = pathname.includes('/dashboard') ? '/' : paths.dashboard.root;

            return (
              <MenuItem
                key={option.label}
                onClick={() => handleClickItem(option.label === 'Home' ? rootHref : option.href)}
                sx={{
                  py: 1,
                  color: 'text.secondary',
                  '& svg': { width: 24, height: 24 },
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {option.icon}

                <Box component="span">{option.label === 'Home' ? rootLabel : option.label}</Box>

                {option.info && (
                  <Label color="error" sx={{ ml: 1 }}>
                    {option.info}
                  </Label>
                )}
              </MenuItem>
            );
          })}
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <SignOutButton
            size="medium"
            variant="text"
            onClose={popover.onClose}
            sx={{ display: 'block', textAlign: 'left' }}
          />
        </Box>
      </CustomPopover>
    </>
  );
}
