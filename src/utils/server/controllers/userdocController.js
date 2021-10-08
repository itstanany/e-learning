import { getUserDoc } from '..';

/**
 * res api controller
 * @param {object} req NextJs request object
 * @param {object} req.body.userCookie - User cookie object decrypted
 * @param {string} req.body.userCookie.uid - user id
 * @param {*} res NextJs response object
 * @returns return user document from database.
 */
const userdocController = async (req, res) => {
  const { body: { userCookie } } = req;
  const userDoc = await getUserDoc({ uid: userCookie?.uid });
  return res.json({ userDoc });
};

export {
  userdocController,
};
