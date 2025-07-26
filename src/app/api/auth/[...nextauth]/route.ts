import type { SessionStrategy } from 'next-auth';
import type { IUser } from '@/models/user.model';

import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import User from '@/models/user.model';
import { connectDB } from '@/lib/mongoose';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'demo@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }
        await connectDB();
        const user = (await User.findOne({ email: credentials.email })) as IUser | null;
        if (!user) {
          throw new Error('User not found');
        }
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) {
          throw new Error('Invalid password');
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.profile.firstName} ${user.profile.lastName}`,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
