const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Organisation name is required"],
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Member", 
            },
        ],
        
    },
    {timestamps:true}
);
const Organisation = mongoose.model("Organisation", organisationSchema)
module.exports = Organisation