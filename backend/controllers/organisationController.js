//const { get } = require("mongoose");
const Organisation =require("../models/Organisation");
const Member = require("../models/Member")


//create Organisation
const createOrganisation = async (req, res) => {
    try {
        if(req.user.role !== "admin" && req.user.role !=="manager"){
            return res.status(403).json({ message:" only admin/ manager can create an organisation"})
        }
        const { name, description, members} = req.body;
         
        const organisation = await Organisation.create({
            name,
            description,
            createdBy:req.user.id,
            members:members || [],
        });

        res.status(201).json(organisation)
    } catch (error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};

//get all organisations
const getOrganisations = async (req,res) => {
    try {
        let organisation;

        if(req.user.role === "admin" || req.user.role === "manager") {
           organisation = await Organisation.find().populate("members");

        } else {
            const memberships = await Member.find({ userId: req.user._id});
            const orgIds = memberships.map((m) => m.orgId)

            organisation = await organisation.find({_id:{ $in: orgIds }}).populate("members");
        }

        res.status(200).json(organisation);
    
    } catch (error) {
        console.error(error) 
            res.status(500).json({message:"Server error"});
        
    };

};

//delete organisation
const deleteOrganisation = async (req,res) => {
    try {
        const organisation = await Organisation.findById(req.params.id);

        if(!organisation) {
            return res.status(404).json({message:"Organisation not found"})
        }

        if(req.user.role !=="admin") {
            return res.status(403).json({message:"Only admin can delete an organisation"})
        }

        await organisation.deleteOne();
        res.status(200).json({message:"Organisation delete successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
};

//invite member
const inviteMember = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId, role } = req.body;

    console.log("Request body:", req.body);

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Check if organisation exists
    const organisation = await Organisation.findById(orgId);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }

    // Create member document
    const newMember = await Member.create({
      orgId,
      userId,
      role: role || "employee",
      invitedBy: req.user._id,
      createdBy: req.user._id,
      updatedBy: req.user._id,
      status: "pending",
    });

    // Add the member's ObjectId to the organisation
    organisation.members.push(newMember._id);
    await organisation.save();

    res.status(201).json({
      message: "Member invited successfully",
      member: newMember,
    });
  } catch (error) {
    console.error("Invite Member Error:", error);
    res.status(500).json({ message: error.message });
  }
};




//update member status

const updateMemberStatus = async (req, res) => {
    try {
        const { orgId, memberId } = req.params;
        const { status } = req.body;

        const organisation = await Organisation.findById(orgId);
        if(!organisation) {
            return res.status(404).json({ message:"Organisation not found"});
         }

        const member = await Member.findById(memberId);
        if(!member || !organisation.members.includes(member._id)){
            return res.status(404).json({ message:"Mmber not found in this organisations"})
        }

         member.status = status;
         member.updateBy = req.user._id;

         await organisation.save();

         res.json({ message: "Member updated successfully", member })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}


module.exports = { createOrganisation, getOrganisations, deleteOrganisation, inviteMember, updateMemberStatus };