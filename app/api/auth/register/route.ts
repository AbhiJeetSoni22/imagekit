import { connectToDatabase } from "@/lib/db";
// import { requestSchema } from "@/lib/requestSchema";
import User, { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    try {
       const {email,password}= await request.json()
    //    await requestSchema.safeParse(request.body)
    if(!email && !password){
        return NextResponse.json(
            {error: "email and password is required"},
            {status:400}
        )
    }
    await connectToDatabase();
   const existingUser= await User.findOne<IUser>({email})

   if(existingUser){
       return NextResponse.json(
            {error: "User already exits"},
            {status:400}
        )
   }
   const user = await User.create({
    email,password
   })

    return NextResponse.json(
            {message : "User registered successfully",user},
            {status:200}
        )
    } catch (error) {
        console.error("Registration Error",error)
        return NextResponse.json(
            {error: "email and password is required"},
            {status:400}
        )
    }
}