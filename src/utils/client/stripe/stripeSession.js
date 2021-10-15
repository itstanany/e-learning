import { getStripe } from './getStripe';
import { apiPostJson } from '../apiPostJson';

const stripeSession = async ({
  items,
  cId,
  cSlug,
}) => {
  const { id } = await apiPostJson({
    url: 'stripe/checkoutSession',
    body: {
      items: items || [],
    },
  });
  console.log({ id });
  const stripe = await getStripe();
  await stripe.redirectToCheckout({ sessionId: id });
};

export {
  stripeSession,
};
