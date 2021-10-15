/*
  * Stipe Checkout session controller
*/

import { getStripe } from '../../stripe';

const stripe = getStripe();

const checkoutSessionController = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: req?.body?.items ?? [],
        // eslint-disable-next-line no-undef
        success_url: `${req.headers.referer}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.referer}/cancel`,
      });
      return res.status(200).json(session);
    } catch (err) {
      return res.status(500).json({
        message: err?.message,
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};
export {
  checkoutSessionController,
};
