/**
 * Check for role of user to be "admin" or "editor"
 * @param {object} req NextJs Request object
 * @param {string} req.body.userCookie.role - user role
 * @param {object} res NextJs response Object
 * @param {function} next - next middleware in middleware chain
 * @returns execute next function if user has access
 * @returns 403 response with error message of not authorized
 */
const requireAdminEditorRole = (req, res, next) => {
  try {
    const {
      body: {
        userCookie: { role },
      },
    } = req;
    if (role === 'admin' || role === 'editor') {
      return next();
    }
    return res.status(403).json({ error: 'not authorized, require admin' });
  } catch {
    return res.status(401).json({ error: 'not authenticated' });
  }
};

export {
  requireAdminEditorRole,
};
