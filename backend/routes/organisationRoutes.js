const express = require("express")
const router = express.Router();

const {createOrganisation, 
    getOrganisations, 
    deleteOrganisation, 
    inviteMember,
    updateMemberStatus
 } = require("../controllers/organisationController")

const { protect} = require("../middleware/authMiddleware");
const { authorizeRoles} = require("../middleware/roleMiddleware")

router.use(protect);

router.post("/",authorizeRoles("admin","manager"),  createOrganisation);
router.get("/", getOrganisations);
router.get("/:id", authorizeRoles("admin"), deleteOrganisation);
router.post("/:orgId/members/invite", authorizeRoles("admin","manager"), inviteMember);
router.put("/:orgId/members/:memberId/status", authorizeRoles("admin","manager"), updateMemberStatus )

module.exports = router