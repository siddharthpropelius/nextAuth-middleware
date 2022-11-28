import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';

// @ts-ignore
export const authOptions: NextAuthOptions = {
  secret: 'akbjsdkjSALNDAKSAAD765765bajshdb',
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter Emails' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },
      async authorize(credentials) {
        try {
          console.log(credentials);
          const user = await axios.post(
            'http://localhost:5000/api/user/login',
            {
              password: credentials?.password,
              email: credentials?.email,
            }
          );
          const decryptPassword = await bcrypt.compare(
            credentials?.password,
            user.data.user.password
          );
          if (decryptPassword) {
            return user.data;
          }
        } catch (e: any) {
          console.log(e);
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.user.id;
        token.name = user?.user?.name;
        token.email = user?.user?.email;
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
      }
      return token;
    },

    async session({ token, session, user }) {
      if (token) {
        session.user.id = token?.id as number;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
