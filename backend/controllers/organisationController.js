const { get } = require("mongoose");
const Organisation =require("../models/Organisation");

//create Organisation
const createOrganisation = async (req, res) => {
    try {
        if(req.user.role !== "admin" && req.user.role !=="manager"){
            return res.status(403).json({ message:" only admun/ manager can create an organisation"})
        }
        const { name, description, members} = req.body;
         
        const organisation = await Organisation.create({
            name,
            description,
            createdBy:req.user.id,
            members,
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
            organisation = await Organisation.find().populate("members", "name email role");
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

module.exports = { createOrganisation, getOrganisations, deleteOrganisation};