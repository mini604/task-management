const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
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

// Get all projects created by the logged-in user (manager)
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).populate(
      "teamMembers",
      "name email role"
    );

    res.status(200).json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createProject, getProjects };
