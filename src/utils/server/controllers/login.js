import { userCookiesOptions } from '../userCookiesOptions';
import { jwtGenerate } from '../jwt';
import { adminApp } from '../../../firebase/admin';
import { createNewUserDoc } from '../createUserDocument';
import { getCookies } from '../getCookies';

/**
 * create new document of "users" collection
 *  cerated object shape: show draw.io project planning.
 * @param {object} userInfo - object of use info
 * @param {string} userInfo.idToken - id token returned by auth provider
 * @param {boolean} userInfo.isNewUser - Is it the first time user register?
 * @param {string} userInfo.role - user role
 * @returns json response with field "auth", true for success login authentication false, otherise
 */
const login = async (req, res) => {
  try {
    const { idToken, isNewUser, role = 'user' } = req.body;
    const cookies = getCookies(req, res);
    const result = await adminApp.auth().verifyIdToken(idToken);
    const userCookie = jwtGenerate({ uid: result.uid, role: result.role || role });
    cookies.set('user', userCookie, userCookiesOptions);
    if (isNewUser) {
      adminApp.auth().setCustomUserClaims(result.uid, { role });
      createNewUserDoc({ role, ...result });
    }
    return res.json({ auth: true });
  } catch (error) {
    return res.json({ auth: false });
  }
};

export {
  login,
};
