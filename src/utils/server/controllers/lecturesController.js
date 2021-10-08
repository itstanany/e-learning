import { getLectures, getResources, isAuth } from '..';

/**
 * Lectures api controller
 * @param {object} req NextJs request object
 * @param {string} req.body.id - course id
 * @param {boolean} req.body.resources - include resources in lect obj or not
 * @param {object} res NextJs response object
 * @returns json object with lectures prop ar arrays of lect objects
 */
const lecturesController = async (req, res) => {
  const { body: { id, resources = false } } = req;
  const lectures = await getLectures({ courseId: id });
  // return lectures with "resources" field as array of lecture resources.
  if (resources && isAuth(req, res)) {
    const lecturesWithRes = await Promise.all(lectures.map(async (lect) => {
      const resource = await getResources({ cId: id, lId: lect?.id });
      return {
        ...lect,
        resources: resource,
      };
    }));
    return res.json({ lectures: lecturesWithRes });
  }
  return res.json({ lectures });
};

export {
  lecturesController,
};
