import { adminApp } from './admin.config';

const adminFirestore = adminApp.firestore();
const settings = { ignoreUndefinedProperties: true };
// fixed, firestore initialized one time
try {
  adminFirestore.settings(settings);
} catch (e) { }

export {
  adminFirestore,
};
