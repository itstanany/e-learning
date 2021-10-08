/**
 * Course delete API route handler
 */
// todo, recover api
import nc from 'next-connect';
import { requireAdminRole, requireAuth } from '../../../../utils/server/middlewares';
import { deleteCourses } from '../../../../utils/server/controllers';

const handler = nc();
// authenticated users only
handler.use(requireAuth);
// authorized only
handler.use(requireAdminRole);
// delete course controller
handler.use(deleteCourses);
export default handler;
