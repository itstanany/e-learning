import ars from 'arslugify';
import { nanoid } from 'nanoid/async';
import { adminFirestore } from '../../firebase/admin';

/**
 * Save course info into the database
 * @param {object} paramsObj - paramters object
 * @param {object} paramsObj.courseInfo - course info object
 * @param {array} paramsObj.lectures - array of lecture objects
 * @returns {object} returnObj - return object
 * @returns {boolean} returnsObj.added
 * @returns {object} returnObj.error - error object in case of errors
 */
const saveCourseInfo = async ({ courseInfo, lectures }) => {
  try {
    const courseId = courseInfo?.id || await nanoid();
    const courseDocRef = await adminFirestore.collection('courses').doc(courseId);
    await courseDocRef.set(
      {
        ...courseInfo,
        slug: ars(courseInfo.title),
        id: courseId,
      },
      // {
      //   merge: true,
      // },
    );

    // add lectures
    lectures.forEach(async (lect) => {
      const lectId = lect.id || await nanoid();
      const {
        resources = [],
        ...remaining
      } = lect;
      const lectDocRef = courseDocRef.collection('lectures').doc(lectId);
      lectDocRef.set({
        ...remaining,
        id: lectId,
      });
      if (resources instanceof Array) {
        resources.forEach(async (res) => {
          const resId = res.id || await nanoid();
          const resWithId = {
            ...res,
            id: resId,
          };
          lectDocRef
            .collection('resources')
            .doc(resId)
            .set(resWithId);
        });
      }
    });

    return { added: true, id: courseId };
  } catch (error) {
    return {
      added: false,
      error,
    };
  }
};

export {
  saveCourseInfo,
};
