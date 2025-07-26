import type { MotionProps } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { forwardRef } from 'react';
import { useResponsive } from '@/hooks/use-responsive';

import Box from '@mui/material/Box';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

export type MotionViewportProps = BoxProps &
  MotionProps & {
    disableAnimate?: boolean;
  };

export const MotionViewport = forwardRef<HTMLDivElement, MotionViewportProps>(
  ({ children, disableAnimate = true, ...other }, ref) => {
    const smDown = useResponsive('down', 'sm');

    const disabled = smDown && disableAnimate;

    const props = disabled
      ? {}
      : {
          component: m.div,
          initial: 'initial',
          whileInView: 'animate',
          variants: varContainer(),
          viewport: { once: true, amount: 0.3 },
        };

    return (
      <Box ref={ref} {...props} {...other}>
        {children}
      </Box>
    );
  }
);
