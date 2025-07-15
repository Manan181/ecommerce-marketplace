export type ServerActionResult<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionError';
  }
}

export function createServerAction<T, Args extends unknown[] = []>(
  callback: (...args: Args) => Promise<{ message: string; data?: T }>
): (...args: Args) => Promise<ServerActionResult<T>> {
  return async (...args: Args) => {
    try {
      const { message, data } = await callback(...args);
      return { success: true, data, message };
    } catch (error) {
      if (error instanceof ServerActionError) return { success: false, error: error.message };
      throw error;
    }
  };
}
