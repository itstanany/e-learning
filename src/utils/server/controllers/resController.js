import { getResources } from '..';

/**
 * res api controller
 * @param {object} req NextJs request object
 * @param {string} req.body.cId - course Id
 * @param {string} req.body.lId - lecture Id
 * @param {*} res NextJs response object
 * @returns return array of all resources associated with lecture.
 */
const resController = async (req, res) => {
  const { body: { cId, lId } } = req;
  const resources = await getResources({ cId, lId });
  return res.json({ resources });
};

export {
  resController,
};
