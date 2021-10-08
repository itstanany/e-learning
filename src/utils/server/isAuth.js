import { getUserCookie } from './getUserCookie';

/**
 * Check for user auth
 * it attaches "courseInfo" object and "lectures" array
 * @param req {object} NextJs request object
 * @param res {object} NextJs request object
 * @return {boolean}
 */
const isAuth = (req, res) => {
  const userCookie = getUserCookie(req, res);
  if (userCookie) return true;
  return false;
};

export {
  isAuth,
};
