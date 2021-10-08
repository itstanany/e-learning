import { adminFirestore } from '../../../firebase/admin';

/**
 * Check for user subscription for a specific course
 * @param {object} req NextJs Request object
 * @param {object} req.body.userCookie - user cookie containing "uid" prop
 * @param {string} req.body.cId - course Id
 * @param {object} res NextJs response Object
 * @param {function} next - next middleware in middleware chain
 * @returns execute next function if user is authenticated
 * @returns 401 response with error message of not authenticated
 */
const requireSubscription = async (req, res, next) => {
  const { userCookie, cId } = req.body;
  const userDoc = await adminFirestore
    .doc(`users/${userCookie.uid}`)
    .get()
    .then((querySnapshot) => querySnapshot.data());
  if (userDoc?.subscription?.includes(cId)) {
    next();
  } else {
    return res.status(401).json({ error: 'not authorized' });
  }
};

export {
  requireSubscription,
};
