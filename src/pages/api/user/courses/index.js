/**
 * Route handler for user subscribed courses
 */
import nc from 'next-connect';
import { userCoursesController } from '../../../../utils/server/controllers';
import { requireAuth } from '../../../../utils/server/middlewares';

const handler = nc();

handler.use(requireAuth);

handler.use(userCoursesController);

export default handler;
