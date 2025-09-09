const express = require("express");
const { createProject, getProjects, deleteProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Only managers can create projects
router.post("/", protect, authorizeRoles("manager"), createProject);

// Only managers can view the projects they created
router.get("/", protect, authorizeRoles("manager"), getProjects);

router.delete("/:id", protect, authorizeRoles("manager", "admin"), deleteProject);



module.exports = router;
