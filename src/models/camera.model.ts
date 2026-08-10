import mongoose from "mongoose"
const cameraSchema = new mongoose.Schema({
    agentId:{
        type:mongoose.Types.ObjectId,
        ref:"Agent"
    },
    cameraStreamId:{
        type:String
    },name:{
        type:String
    },channel:{
        type:Number
    },subStreamUrl:{
        type:String
    },codec:{
        type:String
    },resolution:{
        type:String
    },fps:{
        type:Number
    },bitrate:{
        type:Number
    }
})
export const Camera = mongoose.model("Camera",cameraSchema)