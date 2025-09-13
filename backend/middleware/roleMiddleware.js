const Member = require("../models/Member");

/**
 * Role-based authorization middleware
 * Usage:
 * 1. Global role check: authorizeRoles("admin", "manager")
 * 2. Org-specific check: authorizeRoles("admin", "manager") on routes with orgId param
 */
const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Check if user is logged in
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { orgId } = req.params;

      // If orgId is present → check membership role in that org
      if (orgId) {
        const membership = await Member.findOne({
          orgId,
          userId: req.user._id,
        });

        if (!membership) {
          return res
            .status(403)
            .json({ message: "You are not a member of this organisation" });
        }

        if (!allowedRoles.includes(membership.role)) {
          return res.status(403).json({
            message: `Access denied for your role: ${membership.role}`,
          });
        }

        // Attach membership info to request
        req.membership = membership;
        return next();
      }

      // If orgId is NOT present → check global user role
      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: `Access denied for your role: ${req.user.role}` });
      }

      next();
    } catch (error) {
      console.error("AuthorizeRoles Error:", error);
      res.status(500).json({ message: "Server error in role check" });
    }
  };
};

module.exports = { authorizeRoles };
