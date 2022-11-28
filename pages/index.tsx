import * as React from 'react';
import { FormEventHandler, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import axios from 'axios';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

// import Cookies from 'js-cookie'
const Cookies = require('js-cookie').default;
async function getData() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return res;
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  getData().then(function (result) {
    // console.log("RESULT",result)
  });
  const { data: session } = useSession();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const router = useRouter();

  const onLoginHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const status = await signIn('login', {
      redirect: false,
      callbackUrl: '/home',
      email: email,
      password: password,
    });
    console.log(status);
    console.log('SESSION===', session);
    if (status!.error !== null) {
      alert(status!.error);
    } else {
      console.log('REDIRECT');
      await router.push('/home');
      Cookies.set('auth', 'false');
    }
  };
  return (
    <div className={'w-full h-screen flex justify-center items-center'}>
      <div className="w-full max-w-xs">
        <form onSubmit={(event) => onLoginHandler(event)}>
          <input
            type={'text'}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
          />
          <input
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Password'}
          />
          <button type={'submit'}>login</button>
        </form>
      </div>
    </div>
  );
}
// export default  Home
