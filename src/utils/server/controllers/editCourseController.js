import { saveCourseInfo } from '../saveCourseInfo';
import { updatePrice } from '../stripe';

const editCourseController = async (req, res) => {
  try {
    const {
      body: { courseInfo = null, lectures = null, fileLocation = null },
    } = req;
    const parsedCourseInfo = {
      ...courseInfo,
    };
    if (fileLocation) parsedCourseInfo.thumbnail = fileLocation;
    const { saved, courseId } = await saveCourseInfo({
      courseInfo: parsedCourseInfo,
      lectures,
    });
    await updatePrice({
      priceId: courseInfo?.priceId,
      amount: courseInfo?.price,
      courseId,
      pId: courseInfo?.productId,
    });
    return res.json({ submitted: saved });
  } catch (error) {
    return res.status(400).json({ error: `Error during saving the course. ${error.message}` });
  }
};

export {
  editCourseController,
};
