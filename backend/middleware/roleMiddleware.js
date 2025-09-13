// Role-based authorization middleware
const Member = require("../models/Member")

const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    console.log(req)
    try{
    const { orgId } = req.params;
    if(!orgId) {
      return res.status(400).json({ message:"Organisation ID is required "});
    }

    const membership = await Member.findOne({
      orgId,
      userId:req.user._id,
    });

    if(!membership) {
      return res
      .status(403)
      .json({ message:"You are not a member of this organisation"})
    }

    if(!allowedRoles.includes(membership.role)){
      return res
      .status(403)
      .json({ message:`Access denied for role: ${membership.role}`}); 
  };

  req.membership = membership;
  next();
}
 catch (error) {
  res.status(500).json({ message:"Server error in role check"});
    }
  }
}

module.exports = { authorizeRoles };
