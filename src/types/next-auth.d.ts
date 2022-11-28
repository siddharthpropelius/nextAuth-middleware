import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    accessToken: string;
    refreshToken: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      /** The user's postal address. */
      id: string;
      name: string;
      email: string;
    } & DefaultSession['user'];
  }
}
