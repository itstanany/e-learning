import Cookies from 'cookies';
import { cookieKeys } from './config';
/**
 * Construct and return cookies object
 * @param {object} req -NextJS request object
 * @param {object} res NextJs response object
 * @returns {object} cookies object with "get" and "set" methods
 */
const getCookies = (req, res) => new Cookies(req, res, { keys: cookieKeys });

export {
  getCookies,
};
