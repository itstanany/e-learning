import { AddProductAndPriceId } from '../addProductAndPriceId';
import { saveCourseInfo } from '../saveCourseInfo';
import { createPrice, createProduct } from '../stripe';

const addCourseController = async (req, res) => {
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

    const { product } = await createProduct({
      id: courseId,
      name: courseInfo?.title,
      images: fileLocation ? [fileLocation] : [],
    });

    const { price } = await createPrice({
      pId: product?.id,
      amount: courseInfo?.price,
    });

    await AddProductAndPriceId({
      courseId,
      productId: product?.id,
      priceId: price?.id,
    });

    return res.json({ submitted: saved });
  } catch (error) {
    return res.status(400).json({ error: `Error during saving the course. ${error.message}` });
  }
};

export {
  addCourseController,
};
