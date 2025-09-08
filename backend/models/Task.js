const mongoose = require("mongoose");
const Project = require("./Project");

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Task title is required"]
        },

        description: {
            type: String,
        },
        status:{
            type:String,
            enum:["todo","in-progress","completed"],
            default:"todo"
        },
        priority:{
            type:String,
            enum:["low","medium","high"],
            default:"medium",
        },
        Project:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true,
        },
        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        dueDate:{
            type:Date,
        },
    },
    { timestamps:true}
);

const Task = mongoose.model("Task", taskSchema)
module.exports = Task;