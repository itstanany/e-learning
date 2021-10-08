// remove extra \ added by OS
const jwtPublicKey = (process.env.JWT_PUBLIC_KEY || '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaUNVr1759tcCa8Ud/fa2YINJk\nLTssVDuhMSGBjKGvagzBh/bNpyRcEFO1+m5vyFW4O3uSmXBXNwW4Hcr1ziO70/3R\nQnmiAATerVdWGN1GZ2ELVHC45XR2JNkIkPk574GbmOYy9ns3FNPwPQVB9xO+ebhn\nKb5ZOFMqRVj39UNqbQIDAQAB\n-----END PUBLIC KEY-----').replace(/\\n/g, '\n');
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n');

export {
  jwtPublicKey,
  jwtPrivateKey,
};
