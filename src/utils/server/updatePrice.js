import { AddProductAndPriceId } from './addProductAndPriceId';
import { createPrice } from './stripe/createPrice';
import { getStripe } from './stripe/getStripe';

const stripe = getStripe();
const updatePrice = async ({
  priceId,
  amount,
  pId,
  courseId,
}) => {
  // get current price
  // if difference,
  //  ... create new price
  //  ... add new price Id to the course document
  //  if no difference, do no thing
  const currentPrice = await stripe.prices.retrieve(priceId);
  const currentAmount = currentPrice.unit_amount?.toFixed(2);
  const newAmount = (amount * 100).toFixed(2);
  if (currentAmount !== newAmount) {
    const { price: newPrice } = await createPrice({
      pId,
      amount,
    });
    await AddProductAndPriceId(({
      priceId: newPrice?.id,
      courseId,
      productId: pId,
    }));
  }
};

export {
  updatePrice,
};
