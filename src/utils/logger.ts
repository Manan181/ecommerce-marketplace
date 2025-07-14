import type { Logger } from 'pino';

import pino from 'pino';

const transport =
  process.env.NODE_ENV === 'production'
    ? undefined // No pretty-printing in production
    : {
        target: 'pino-pretty',
        options: { colorize: true },
      };

export const logger: Logger = pino({
  transport,
  level: process.env.LOGGER_LEVEL ?? 'info',
});
