import { getUserCookie } from '..';

/**
 * Check for auth of user
 * Attach "userCookie" to request body
 * @param {object} req NextJs Request object
 * @param {object} res NextJs response Object
 * @param {function} next - next middleware in middleware chain
 * @returns execute next function if user is authenticated
 * @returns 401 response with error message of not authenticated
 */
const checkAuth = (req, res, next) => {
  const userCookie = getUserCookie(req, res);
  if (userCookie) {
    // const user = jwtVerify({ token: userCookie });
    // avoid empty string req.body
    req.body = {
      ...req.body,
      // rename user to userCookie,
      //  ... so avoid the possibility of "user" field in body ibject send by the client
      userCookie,
    };
    return next();
  }
  return res.status(401).json({ error: 'not authenticated' });
};

const requireAuth = checkAuth;

export {
  requireAuth,
};
