/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import {
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
} from '../../utils/server/config';
// import serviceAccount from '../../keys/serviceAccountKey.json';

// const adminApp = admin.apps.length
//   ? admin.app()
//   : admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://e-learning-76331.appspot.com',

//   });

const adminApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
    credential: admin.credential.cert({
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
    }),
    storageBucket,
  });

export default adminApp;

export {
  adminApp,
};
