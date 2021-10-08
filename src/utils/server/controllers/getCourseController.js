import { getCourse, getLectures } from '..';

/**
 * return course info and its lectures.
 * @param {*} req NextJs request object
 * @param {*} res NextJs response object
 * @returns {object} resObj - json object with object and lectures props
 * @returns {object | null} resObj.course - course object if found, null otherwise
 * @returns {array} resObj.lectures - array of course lectures
 */
const getCourseController = async (req, res) => {
  const { body: { id, lectures = true } } = req;
  const course = await getCourse({ id }) || null;
  let lecturesData = null;
  if (lectures) {
    lecturesData = await getLectures({ courseId: id });
  }
  res.json({
    course,
    lectures: lecturesData,
  });
};

export {
  getCourseController,
};
