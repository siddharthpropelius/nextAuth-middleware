import React, {FormEventHandler, useState} from 'react'
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import { NextPage } from "next";
import axios from 'axios'
import Cookies from 'js-cookie'

async function getData() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return res;
}


export default  function Home(){
    getData().then(function (result){
        // console.log("RESULT",result)
    })
;  const [email,setEmail]=useState<string | null>(null);
  const [password,setPassword]=useState<string | null>(null);
  const router = useRouter();

  const onLoginHandler:FormEventHandler<HTMLFormElement>=async(event)=>{
    event.preventDefault();
  const status= await  signIn("credentials",{
      redirect:false,
      email:email,
      password:password,
    })
  console.log(status)
if(status!.error !== null){
    alert(status!.error)

}else{
    console.log("REDIRECT")
   await router.push('/home')
    Cookies.set("auth","false");
}
  }
  return (
    <div className={'w-full h-screen flex justify-center items-center'}>
      <div className="w-full max-w-xs">
       <form onSubmit={(event)=>onLoginHandler(event)}>
         <input type={'text'} onChange={(e)=>setEmail(e.target.value)}  placeholder={'Email'} />
         <input type={'password'} onChange={(e)=>setPassword(e.target.value)} placeholder={'Password'}/>
         <button type={'submit'}>login</button>
       </form>
      </div>
    </div>
  )
}
// export default  Home
