import jwt from 'jsonwebtoken';

/**
 * 
 * @param {string} secretOrPrivateKey - jwt private or secret key
 * @param {string} secretOrPublicKey - jwt public or secret key
 * @param {object} options - jwt options, algorithm + keyid + noTimestamp + expiresIn + notBefore
 */
function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
  this.secretOrPrivateKey = secretOrPrivateKey;
  this.secretOrPublicKey = secretOrPublicKey;
  this.options = options; // algorithm + keyid + noTimestamp + expiresIn + notBefore
}

/**
 * JWT sign method
 * @param {any} payload - payload to be signed
 * @param {object} signOptions - jwt signing options
 * @returns signed payload in form of jwt
 */
TokenGenerator.prototype.sign = function (payload, signOptions) {
  const jwtSignOptions = { ...signOptions, ...this.options };
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};

/**
 * JWT verification method
 * @param {object} paramsObj - parameter object
 * @param {jwt string} paramsObj.token - JWT token
 * @param {object} paramsObj.verifyOptions - JWT verification object
 * @returns verified decrypted JWT
 */
TokenGenerator.prototype.verify = function ({ token, verifyOptions = {} }) {
  return jwt.verify(token, this.secretOrPrivateKey, verifyOptions);
};

export {
  TokenGenerator,
};
