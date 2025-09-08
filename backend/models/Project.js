const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Project name is required"],
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        teamMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ],
    },
    { timestamps: true}
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
