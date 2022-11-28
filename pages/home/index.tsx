import * as React from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

function Home() {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export default Home;
