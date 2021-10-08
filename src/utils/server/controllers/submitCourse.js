import { saveCourseInfo } from '../saveCourseInfo';
import { getStripe } from '../stripe';

const stripe = getStripe();

/**
 * Controller for course submission
 * It saves course and lectures
 * add new entries in DB or update current ones
 * @param {*} req NextJs request object
 * @param {*} res NextJs response object
 * @returns response with status and json content
 */
const submitCourse = async (req, res) => {
  try {
    const {
      body: { courseInfo = null, lectures = null, fileLocation = null },
    } = req;
    const parsedCourseInfo = {
      ...courseInfo,
    };
    if (fileLocation) parsedCourseInfo.thumbnail = fileLocation;
    const { added, courseId } = await saveCourseInfo({
      courseInfo: parsedCourseInfo,
      lectures,
    });
    return res.json({ added });
  } catch (error) {
    return res.statusCode(400).json({ error: `Error during saving the course. ${error.message}` });
  }
};

export {
  submitCourse,
};
