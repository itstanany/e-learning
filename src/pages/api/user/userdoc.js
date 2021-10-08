/**
 * userdoc API route handler
 */
import nc from 'next-connect';
import { userdocController } from '../../../utils/server/controllers';
import { requireAuth } from '../../../utils/server/middlewares';

const handler = nc();
handler.use(requireAuth);

handler.use(userdocController);

export default (handler);
