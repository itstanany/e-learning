/**
 * User cookies options
 */
import { cookieKeys } from './config';

const userCookiesOptions = {
  httpOnly: true,
  maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
  overwrite: true,
  path: '/',
  sameSite: 'strict',
  secure: false, // set this to false in local (non-HTTPS) development
  signed: true,
  keys: cookieKeys,
};

export { userCookiesOptions };
