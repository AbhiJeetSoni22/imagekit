import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
      providers: [
   Github({
        clientId:process.env.GITHUB_CLIENT_ID!,
        clientSecret:process.env.GITHUB_CLIENT_SECRET!
    }),
       Google({
      clientId:process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!
    }),
    // ...add more providers here
    CredentialsProvider({
        name: "Credentials",
        credentials:{
           email: {label:"Email" , type: "text"},
         password: {label:"Password", type:"password"}
          },

        async authorize(credentials){
            if(!credentials.email && !credentials?.password){
                throw new Error("missing email or password")
            }
        

        try {
            await connectToDatabase();
           const user= await User.findOne({email:credentials.email})
           if(!user){
            throw new Error("no user found with this email")
           }
           const isValid =await bcrypt.compare(
            credentials.password , user.password
           )
           if(!isValid){
            throw new Error("invalid password")
           }
           return {
            id: user._id.toString(),
            email: user.email
           }

        } catch (error) {
            console.error("Auth error" , error)
            
        }
        }
    })

  ],

  callbacks:{
    async jwt({
        token, user, 
    }){
        if(user){
            token.id = user.id
        }
        return token
    },

    async session({
       session, token 
    }){
        if(session.user){
            session.user.id = token.id as string
        }
        return session
    },
  },

  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy: "jwt",
    maxAge: 30*24*60*60
  },
  secret: process.env.NEXTAUTH_SECRET
};