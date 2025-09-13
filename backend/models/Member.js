const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        orgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",   // Reference to Organisation model
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",           // Reference to User model
            required: true,
        },
        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",           // Who sent the invite
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",           // Who created the record
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",           // Last user who updated
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "manager", "employee"], // Roles in the org
            default: "employee",
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"], // Invitation status
            default: "pending",
        },
    },
    { timestamps: true }
);


const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
