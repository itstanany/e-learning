/**
 * API route handler for getting all authors
 */
import nc from 'next-connect';
import { requireAuth } from '../../../utils/server/middlewares';
import { allAuthorsController } from '../../../utils/server/controllers';

const handler = nc();
handler.use(requireAuth);

handler.use(allAuthorsController);

export default handler;
