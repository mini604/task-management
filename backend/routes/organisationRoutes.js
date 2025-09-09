const express = require("express")
const router = express.Router();
const {createOrganisation, getOrganisations, deleteOrganisation} = require("../controllers/organisationController")
const { protect, authorizeRoles} = require("../middleware/authMiddleware");


router.post("/",protect, authorizeRoles("admin"), createOrganisation);
router.get("/",protect, authorizeRoles("admin"), getOrganisations);
router.get("/:id",protect, authorizeRoles("admin"), deleteOrganisation)

module.exports = router