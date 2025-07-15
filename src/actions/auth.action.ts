'use server';

import type { IUser } from 'src/models/user.model';

import bcrypt from 'bcrypt';

import { logger } from 'src/utils/logger';
import { ServerActionError, createServerAction } from 'src/utils/action.utils';

import User from 'src/models/user.model';
import { connectDB } from 'src/lib/mongoose';

// ----------------------------------------------------------------------

const log = logger.child({ module: 'auth.action' });

export type SignUpParams = {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  };
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = createServerAction(
  async ({
    email,
    password,
    profile,
  }: SignUpParams): Promise<{
    message: string;
    data?: { _id: string; email: string; name: string };
  }> => {
    await connectDB();
    const params: Pick<IUser, 'email' | 'password' | 'profile' | 'role'> = {
      email,
      password,
      role: 'vendor',
      profile,
    };
    try {
      const exist = await User.findOne({ email });
      if (exist) {
        throw new ServerActionError('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        ...params,
        password: hashedPassword,
      });

      return {
        message: 'User created successfully',
        data: {
          _id: user._id.toString(),
          email: user.email,
          name: `${user.profile.firstName} ${user.profile.lastName}`,
        },
      };
    } catch (error) {
      log.error('Error during sign up:', error);
      throw new ServerActionError(error);
    }
  }
);
