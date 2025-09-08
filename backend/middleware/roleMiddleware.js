// Role-based authorization middleware
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: you do not have permission for this action",
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
