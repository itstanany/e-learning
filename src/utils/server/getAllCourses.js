/**
 * To Do:
 *  limit returned courses and implement pagination
 */
import { adminFirestore } from '../../firebase/admin';
import { getUserDoc } from './getUserDoc';

/**
 * return user subscribed courses or all courses in the database
 * @param {object} param0 - customization object
 * @param {string} param0.uid - user id
 * @returns array of courses objects
 */
const getAllcourses = async ({ uid } = {}) => {
  const collectionRef = adminFirestore.collection('courses');
  if (uid) {
    const userDoc = await getUserDoc({ uid });
    const result = await Promise.all(userDoc.subscription.map((cid) => (
      collectionRef.doc(cid)
        .get()
        .then((docRef) => (docRef.data()))
    )));
    const courses = [];
    result?.forEach((course) => course?.id && courses.push(course));
    return courses;
  }
  return collectionRef
    .get()
    .then((querySnapshot) => (
      querySnapshot.docs.map((doc) => (doc.data()))));
};

export {
  getAllcourses,
};
