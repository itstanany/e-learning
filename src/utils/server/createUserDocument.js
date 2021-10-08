import { adminFirestore } from '../../firebase/admin';
/**
 * Save new user into data base
 * @param {object} paramsObj - parameters object
 * @param {string} paramsObj.name - user name
 * @param {email} paramsObj.email - user email
 * @returns {Promise<void>}
 */
const createNewUserDoc = ({
  name, email, phoneNumber = null, picture = null, uid, role,
}) => adminFirestore.collection('users').doc(uid).set({
  name,
  email,
  picture,
  phoneNumber,
  subscription: [],
  uid,
  role: role || 'user',
});

export { createNewUserDoc };
