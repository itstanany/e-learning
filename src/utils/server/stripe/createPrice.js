import { getStripe } from './getStripe';

const stripe = getStripe();
const createPrice = async ({ pId, amount = 0 } = {}) => {
  const price = await stripe.prices.create({
    product: pId,
    unit_amount: amount * 100,
    currency: 'usd',
  });
  return {
    price,
  };
};

export {
  createPrice,
};
