import { adminApp } from './admin.config';

const adminFirestore = adminApp.firestore();
const settings = { ignoreUndefinedProperties: true };
adminFirestore.settings(settings);

export {
  adminFirestore,
};
