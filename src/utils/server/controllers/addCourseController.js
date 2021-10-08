import { saveCourseInfo } from '../saveCourseInfo';

const addCourseController = async (req, res) => {
  try {
    const {
      body: { courseInfo = null, lectures = null, fileLocation = null },
    } = req;
    const parsedCourseInfo = {
      ...courseInfo,
    };
    if (fileLocation) parsedCourseInfo.thumbnail = fileLocation;
    const { saved/* , courseId */ } = await saveCourseInfo({
      courseInfo: parsedCourseInfo,
      lectures,
    });
    return res.json({ submitted: saved });
  } catch (error) {
    return res.statusCode(400).json({ error: `Error during saving the course. ${error.message}` });
  }
};

export {
  addCourseController,
};
