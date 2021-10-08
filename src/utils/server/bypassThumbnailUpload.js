/**
 * Check for possibility of by passing upload  thumbnail
 * @param {object} paramsObj - parameters object
 * @param {object} paramsObj.req - NextJs request body
 * @param {object} paraObj.req.body.courseInfo - course info object with prop "thumbnail"
 * @returns {boolean}
 */
const bypassThumbnailUpload = ({ req }) => {
  const parsedCourseInfo = req?.body?.courseInfo;
  if (parsedCourseInfo?.thumbnail) {
    return true;
  }
  return false;
};

export {
  bypassThumbnailUpload,
};
