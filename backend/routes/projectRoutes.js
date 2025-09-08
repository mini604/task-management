import express from 'express';
import { createProject, getProjects } from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

router.post("/", protect, authorizeRoles("manager"), createProject);
router.get("/",protect,authorizeRoles("manager"),getProjects);

export default router;