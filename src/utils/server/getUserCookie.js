import Cookies from 'cookies';
import { cookieKeys } from './config';
import { jwtVerify } from './jwt';

/**
 * extract and decrypt user cookie from request
 * @param {object} req NextJs Request object
 * @param {object} res NextJs response Object
 * @returns user cookie decrypted jwt
 * @returns null for jwt errors, which indicated expiration or not found
 */
const getUserCookie = (req, res) => {
  try {
    const cookies = new Cookies(req, res, { keys: cookieKeys });
    const userCookie = cookies.get('user', { signed: true });
    const user = jwtVerify({ token: userCookie });
    return user;
    // return JSON.parse(cookies.get('user', { signed: true }) || null);
  } catch (error) {
    return null;
  }
};

export {
  getUserCookie,
};
