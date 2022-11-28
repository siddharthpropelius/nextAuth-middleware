import { NextRequest, NextResponse } from 'next/server';

export default function Middleware(
  request: NextRequest,
  response: NextResponse
) {
  const cookie = request.cookies.get('auth');

  // if(request.url === 'http://localhost:3000/home'){
  //     if(cookie!.value !== 'true'){
  //         console.log(cookie)
  //         return NextResponse.redirect(new URL('/',request.url))
  //     }
  // }
  // if(request.url === 'http://localhost:3000/'){
  //     if(cookie!.value !== 'false'){
  //         console.log(cookie)
  //         return NextResponse.redirect(new URL('/home',request.url))
  //     }
  // }
}
