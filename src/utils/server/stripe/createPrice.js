const createPrice = ({ pId, amount = 0 } = {}) => {
  const price = stripe.prices.create({
    product: pId,
    unit_amount: amount * 1000,
    currency: 'usd',
  });
  return {
    price,
  };
};

export {
  createPrice,
};
