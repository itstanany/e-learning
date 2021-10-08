import { adminFirestore } from '../../firebase/admin';

/**
 * Fetch course lectures documents from Data base
 * @param {object} paramsObj - parameters object
 * @param {string} paramsObj.courseId - course Id
 * @returns {array} array of lectures doc objects
 */
const getLectures = ({ courseId }) => adminFirestore
  .collection(`courses/${courseId}/lectures`)
  .orderBy('order')
  .get()
  .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

export {
  getLectures,
};
