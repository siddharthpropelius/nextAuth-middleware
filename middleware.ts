import  { NextRequest,NextResponse } from 'next/server'
// import {useSession} from 'next-auth/react'

export default function Middleware(request: NextRequest, response:NextResponse) {
    const cookie = request.cookies.get('auth');
    if(request.url === 'http://localhost:3000/home'){
        if(cookie!.value !== 'true'){
            console.log(cookie)
            return NextResponse.redirect(new URL('/',request.url))
        }
    }
    if(request.url === 'http://localhost:3000/'){
        if(cookie!.value !== 'false'){
            console.log(cookie)
            return NextResponse.redirect(new URL('/home',request.url))
        }
    }
    // else{
    //     return NextResponse.redirect(new URL('/',request.url))
    // }
}


