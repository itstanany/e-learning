import { getStripe } from '../stripe';

const stripe = getStripe();

const requirePayment = async (req, res, next) => {
  const { body: { sessionId } } = req;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid = session?.payment_status === 'paid' || session?.payment_status === 'no_payment_required';
  if (paid) {
    return next();
  }

  return res.status(403).json({
    status: 'unpaid',
  });
};

export {
  requirePayment,
};
