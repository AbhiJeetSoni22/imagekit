import mongoose,{Schema, model,models} from "mongoose";

export const VIDEO_DIMENTSIONS = {
    width:1080,
    heigth: 1920
} as const;

export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description : string;
    videoUrl:string;
    thumnailUrl: string;
    controls?: boolean;
    transformation?:{
        height:number;
        width: number;
        quality?: number;
    }
}

const videoSchema = new Schema<IVideo>(
    {
        title:{
          type: String,
          required:true
        },
        description:{
          type: String,
          required:true
        },
        videoUrl:{
          type: String,
          required:true
        },
       thumnailUrl:{
          type: String,
          required:true
        },
        controls:{
            type:Boolean,
            default:true
        },
        transformation:{
            height:{
                type:Number,default:VIDEO_DIMENTSIONS.heigth
            },
            width:{
                type:Number,default:VIDEO_DIMENTSIONS.width
            },
            quality:{type: Number, min:1,max:100}

        }
    },
    {
        timestamps:true
    }
)
const Video = (models.Video as mongoose.Model<IVideo>) || model<IVideo>("Video",videoSchema)
export default Video