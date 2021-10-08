import { getAllcourses } from '../getAllCourses';

/**
 * Fetch all courses controller
 * @param {object} req NextJs Request object
 * @param {object} res NextJs response Object
 * @returns status 200, json object with "courses" prop with value of array of objects
 * @returns status 400, json object with error message in case of errors
 */
const getCourses = async (req, res) => {
  try {
    const courses = await getAllcourses();
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status('400').json({ error: error.message });
  }
};

export {
  getCourses,
};
