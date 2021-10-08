import { buffer } from 'micro';
import { STRIPE_WEBHOOK_SECRET } from '../../config/stripe';
import { getStripe } from '../../stripe';

const stripe = getStripe();
const webhookController = async (req, res) => {
  if (req.method === 'POST') {
    let event;
    try {
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.log(`Webhooks error: ${error.message}`);
      return res.status(500).json({
        message: error.message,
      });
    }
    console.log(`success: ${event?.id}`);

    if (event?.type === 'checkout.session.completed') {
      // logic goes here
      console.log('payment received');
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export {
  webhookController,
};
