const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,

        // reference to user connection
        ref:"user"
    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    status:{
        type:String,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:`{VALUE} is not of type status`
        }
    }
},
{timestamps:true}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save",function(){
    const connectionRequest=this;

    // check if toUserId is equal to fromUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you can't send the request to yourself");
    }
})

const ConnectionRequestModel=new mongoose.model("connectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;