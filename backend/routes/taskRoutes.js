const express = require("express");
const { createTask, updateTaskStatus } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("manager"), createTask);
router.patch("/:id/status", protect, updateTaskStatus);

module.exports = router;
