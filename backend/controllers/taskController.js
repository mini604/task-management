const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a new task
const createTask = async (req, res) => {
  console.log(req)
 // try {
    const { title, description,status, priority, dueDate, assignedTo, projectId } = req.body;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      project: projectId,
      createdBy: req.user.id, // comes from protect middleware
    });

    res.status(201).json({ success: true, task });
  //} catch (err) {
    //res.status(500).json({ message: "Server error", error: err.message });
  //}
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Restrict employees: they can only update their own tasks
    if (req.user.role === "employee" && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot update this task" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createTask, updateTaskStatus };
