/**
 * Check for role of user
 * @param {object} req NextJs Request object
 * @param {string} req.body.userCookie.role - user role
 * @param {object} res NextJs response Object
 * @param {function} next - next middleware in middleware chain
 * @returns execute next function if user has access
 * @returns 403 response with error message of not authorized
 */
const requireAdminRole = (req, res, next) => {
  if (req?.body?.userCookie?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'not authorized, require admin' });
};

export {
  requireAdminRole,
};
