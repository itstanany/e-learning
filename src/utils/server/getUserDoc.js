import { adminFirestore } from '../../firebase/admin';
/**
 * Fetch user doc from db
 * @param {object} paramsObj - parameters object
 * @returns user document from db
 */
const getUserDoc = ({ uid }) => adminFirestore.doc(`/users/${uid}`).get().then((docRef) => docRef.data());
export {
  getUserDoc,
};
