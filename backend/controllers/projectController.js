const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
  console.log(req)
  try {
    const { name, description, teamMembers } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id, // comes from protect middleware
      teamMembers,
    });

    await project.save();

    res.status(201).json({ success: true, message:"Project created successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//fetch all projects
const getProjects = async(req,res) =>{
  try {
    let projects;

    if(req.user.role === "manager" || req.user.role === "admin") {
      //manager and admins see all projects
      projects = await Project.find().populate("teamMembers","name email role ");
    } else {
      //employee see only their projects
      projects = await Project.find({teamMembers:req.user.id}).populate(
        "teamMembers",
        "name email role"
      );
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server error"});
  }
};


const deleteProject = async (req,res) => {
  try {
    const project = await Project.findById(req.params.id);

    if(!project) {
      return res.status(404).json({message:"Project not found"})
    }
    //only manager or admin can delete
     if (req.user.role !== "manager" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete project" });
    }
    await project.deleteOne();
    res.status(200).json({message:"Project deleted successfully"})
  } catch (error) {
    res.status(500).json({message:"Server error"})
  }
}

module.exports = { createProject, getProjects, deleteProject };
