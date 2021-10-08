import { getAllcourses } from '..';

/**
 * api endpoint controller for getting all user subscribed courses
 * @param {object} req NextJS request object
 * @param {string} req.body.userCookie - user cookie object with "uid" prop
 * @param {object} res NextJS response object
 * @returns json object with courses prop as array of courses objects
 */
const userCoursesController = async (req, res) => {
  try {
    const { body: { userCookie } } = req;
    const courses = await getAllcourses({ uid: userCookie.uid });
    return res.json({ courses });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export {
  userCoursesController,
};
