import NextAuth ,{NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'
import bcrypt from "bcrypt";

// @ts-ignore
const authOptions:NextAuthOptions = {
    secret:"akbjsdkjSALNDAKSAAD765765bajshdb",
    session: {
        strategy:'jwt',
    },
    providers: [
        CredentialsProvider({
            type:'credentials',
            credentials:{},
             async authorize (credentials,req) {
                 try {
                     const {email, password} = credentials as { email: string, password: string }
                    const findUser = await axios.post('http://localhost:5000/api/user/login',{email:email,password:password});
                     const decryptPassword =await bcrypt.compare(password,findUser.data.user.password);
                    if(decryptPassword){
                        console.log("user",findUser.data.user)
                        return findUser
                    }
                     return null
                 } catch (e: any) {
                     return null;
                 }
             }
             })
    ],
    callbacks: {
        signIn: async () => {
            return Promise.resolve(true);
        },
    },

};

export default NextAuth(authOptions);
