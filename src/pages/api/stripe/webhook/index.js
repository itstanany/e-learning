import { webhookController } from '../../../../utils/server/controllers/stripe';

const handler = webhookController;

const config = {
  api: {
    // we want raw request data to make sure it comes from stripe
    bodyParser: false,
  },
};

export default handler;

export {
  config,
};
