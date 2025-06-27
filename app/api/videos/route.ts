'use server'
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try {
      console.log('connecting database')
       await connectToDatabase();
       console.log('connected ')
      const videos = await Video.find({}).sort({createdAt:-1}).lean()
      if(!videos || videos.length === 0){
        return NextResponse.json([],{status:200})
      }
     
      return NextResponse.json(videos)
    } catch (error) {
      console.log(error)
        return NextResponse.json(
            {error:"failed to fetch "},
            {status:500}
        )
    }
}

export async function POST(request : NextRequest){
    try {
      const session = await getServerSession(authOptions)
      if(!session){
             return NextResponse.json(
            {error:"Unauthorised "},
            {status:401}
        )
      }
      await connectToDatabase()
      const body:IVideo = await request.json()
      if(
        !body.title || !body.description || !body.thumnailUrl
      ){
               return NextResponse.json(
            {error:"Missing required fields "},
            {status:400}
        )
      }

      const videoData = {
        ...body,
        controls: body?.controls ?? true,
        transformation:{
            height:1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
        },
      }

      const newVideo = await Video.create(videoData)
       revalidatePath('/')
      return NextResponse.json(newVideo)
    } catch (error) {
        console.log(error)
            return NextResponse.json(
            {error:"failed to create video "},
            {status:500}
        )
    }
}