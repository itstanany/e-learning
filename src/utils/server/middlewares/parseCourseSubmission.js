const parseCourseSubmission = async (req, res, next) => {
  /**
   * Parse request body of course submit api
   * it attaches "courseInfo" object and "lectures" array
   * @param req {object} NextJs request object
   * @param res {object} NextJs request object
   * @param next {function} next function in the middleware chain
   * @return execute "next" function or return response with JSON error object and status 400
   */
  try {
    const parsedCourseInfo = JSON.parse(req?.body?.courseInfo);
    const parsedLectures = JSON.parse(req?.body?.lectures);
    req.body.courseInfo = parsedCourseInfo;
    req.body.lectures = parsedLectures;
    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export {
  parseCourseSubmission,
};
