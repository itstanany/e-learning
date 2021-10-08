import { adminApp } from './admin.config';

const adminBucket = adminApp.storage().bucket();

export {
  adminBucket,
};
