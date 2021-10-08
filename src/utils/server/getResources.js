import { adminFirestore } from '../../firebase/admin';

/**
 * Fetch lecture resource documents from Data base
 * @param {object} paramsObj - parameters object
 * @param {string} paramsObj.cId - course Id
 * @param {string} paramsObj.lId - lecture Id
 * @returns {array} array of lecture resources doc objects
 */
const getResources = async ({ cId, lId }) => (
  adminFirestore
    .collection('courses')
    .doc(cId)
    .collection('lectures')
    .doc(lId)
    .collection('resources')
    .get()
    .then((querySnapshot) => (
      querySnapshot.docs.map((doc) => (doc.data())))));

export {
  getResources,
};
