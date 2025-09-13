const express = require("express");
const { signup, login } = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");



const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected route
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome ADMIN!" });
});

module.exports = router;
