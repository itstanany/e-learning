import { adminFirestore } from '../../firebase/admin';

/**
 * Fetch course document from Data base
 * @param {object} paramsObj - parameters object
 * @param {string} paramsObj.id - course Id
 * @returns {object} course document from data base
 */
const getCourse = ({ id }) => adminFirestore
  .doc(`courses/${id}`)
  .get()
  .then((doc) => doc.data());

export {
  getCourse,
};
