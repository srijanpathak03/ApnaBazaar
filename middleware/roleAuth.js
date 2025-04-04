// Middleware for role-based access control
const roleAuth = (roles = []) => {
  // Convert string to array if only one role provided
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied: requires ${roles.join(' or ')} role` 
      });
    }
    
    next();
  };
};

module.exports = roleAuth; 