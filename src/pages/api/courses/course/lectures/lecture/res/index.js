/**
 * lecture resources API route handler
 */
import nc from 'next-connect';
import { resController } from '../../../../../../../utils/server/controllers';
import { requireAuth, requireSubscription } from '../../../../../../../utils/server/middlewares';

const handler = nc();
handler.use(requireAuth);
handler.use(requireSubscription);

handler.use(resController);

export default handler;
