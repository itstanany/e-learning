/* eslint-disable camelcase */
const type = process.env.FBA_TYPE || 'service_account';
const project_id = process.env.FBA_PROJECT_ID || 'e-learning-76331';
const private_key_id = process.env.FBA_PRIVATE_KEY_ID;
const private_key = process.env.FBA_PRIVATE_KEY?.replace(/\\n/g, '\n');
const client_email = process.env.FBA_CLIENT_EMAIL || 'firebase-adminsdk-xqv7t@e-learning-76331.iam.gserviceaccount.com';
const client_id = process.env.FBA_CLIENT_ID || '115143213502093949190';
const auth_uri = process.env.FBA_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth';
const token_uri = process.env.FBA_TOKEN_URI || 'https://oauth2.googleapis.com/token';
const auth_provider_x509_cert_url = process.env.FBA_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs';
const client_x509_cert_url = process.env.FBA_CLIENT_X509_CERT_URL;
const storageBucket = process?.env?.FBA_STORAGE_BUCKET;

export {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  storageBucket,
};
