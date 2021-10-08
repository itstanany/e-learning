/**
 * public/private key generator
 *  https://travistidwell.com/jsencrypt/demo/
 */
import { TokenGenerator } from './TokenGenerator';
import { jwtPublicKey, jwtPrivateKey } from '../config';

const tokenGenerator = new TokenGenerator(jwtPrivateKey, jwtPublicKey, {
  expiresIn: '7d',
  algorithm: 'RS256',
});

/**
 * Encrypt a message into jwt string
 * @param {any} plainMessage -  message to be encrypted to JWT
 * @param {object} options - jwt sign options
 * @returns jwt string
 */
const jwtGenerate = (plainMessage, options = {}) => (
  tokenGenerator.sign(plainMessage, options)
);

/**
 * Verify JWT token
 * @param {object} paramsObj -  verification object params
 * @param {string} paramsObj.toke - JWT token
 * @param {object} paramsObj.verifyOptions - jwt.verify verification object
 * @returns decrypted token
 */
const jwtVerify = ({ token, verifyOptions }) => (
  tokenGenerator.verify({ token, verifyOptions: { ...verifyOptions, algorithms: ['RS256'] } })
);

export {
  jwtGenerate,
  jwtVerify,
};
