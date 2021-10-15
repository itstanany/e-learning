import nc from 'next-connect';
import { subscribeController } from '../../../../utils/server/controllers';
import { requireAuth, requirePayment } from '../../../../utils/server/middlewares';

const handler = nc();

handler.use(requireAuth);

handler.use(requirePayment);

handler.use(subscribeController);

export default handler;
