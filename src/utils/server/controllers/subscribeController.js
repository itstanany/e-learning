import { subscribeUserToCourse } from '../subscribeUserToCourse';

const subscribeController = async (req, res) => {
  try {
    const {
      body: {
        cId,
        userCookie: {
          uid,
        },
      },
    } = req;
    await subscribeUserToCourse({
      cId,
      uid,
    });
    return res.status(200).json({
      status: 'subscribed',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export {
  subscribeController,
};
