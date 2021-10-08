import { userCookiesOptions } from '../userCookiesOptions';
import { getCookies } from '../getCookies';

/**
 * Logout controller
 * @param {object} req NextJs Request object
 * @param {object} res NextJs response Object
 */
const logout = async (req, res) => {
  try {
    const cookies = getCookies(req, res);
    cookies.set('user', undefined, userCookiesOptions);
    return res.json({ logout: true });
  } catch {
    return res.json({ logout: false });
  }
};

export {
  logout,
};
